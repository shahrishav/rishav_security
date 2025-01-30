const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOtp = require("../service/sendOtp");


const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 20,
  regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Enforce complexity
};
const MAX_LOGIN_ATTEMPTS = 15; // Maximum attempts allowed
const LOCK_TIME = 15 * 60 * 1000; // Lock time in milliseconds (15 minutes)


// Function to validate password strength
const isPasswordValid = (password) => {
  return (
    password.length >= PASSWORD_POLICY.minLength &&
    password.length <= PASSWORD_POLICY.maxLength &&
    PASSWORD_POLICY.regex.test(password)
  );
};

// Function to check password reuse
const isPasswordReused = async (user, newPassword) => {
  for (const hashedOldPassword of user.passwordHistory || []) {
    if (await bcrypt.compare(newPassword, hashedOldPassword)) {
      return true;
    }
  }
  return false;
};

// Function to check password expiry
const isPasswordExpired = (passwordLastChanged) => {
  const expiryDate = new Date(passwordLastChanged);
  expiryDate.setDate(expiryDate.getDate() + PASSWORD_EXPIRY_DAYS);
  return new Date() > expiryDate;
};


const createUser = async (req, res) => {
  const { fname, lname, phone, email, password } = req.body;

  // Validate required fields
  if (!fname || !lname || !phone || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  // Validate phone format
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number format!",
    });
  }

  // Validate password
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must meet complexity requirements!",
    });
  }

  try {
    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Hash the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // Create a new user
    const newUser = new userModel({
      fname,
      lname,
      phone,
      email,
      password: hashedPassword,
      passwordHistory: [hashedPassword],
      passwordLastChanged: new Date(),
      loginAttempts: 0,
      lockUntil: null,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter both email and password.",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000);
      return res.status(403).json({
        success: false,
        message: "Account is locked due to multiple failed login attempts.",
        remainingTime,
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
        await user.save();
        return res.status(403).json({
          success: false,
          message: "Account locked due to multiple failed login attempts.",
          remainingTime: LOCK_TIME / 1000,
        });
      }

      await user.save();
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
        remainingAttempts: MAX_LOGIN_ATTEMPTS - user.loginAttempts,
      });
    }

    // Reset login attempts and lock status on successful login
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: `${user.role} logged in successfully.`,
      token,
      userData: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  if (!isPasswordValid(newPassword)) {
    return res.status(400).json({
      success: false,
      message: "New password must meet complexity requirements!",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect!",
      });
    }

    if (await isPasswordReused(user, newPassword)) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be one of your recent passwords!",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, randomSalt);

    user.password = hashedNewPassword;
    user.passwordHistory = [
      hashedNewPassword,
      ...user.passwordHistory.slice(0, PASSWORD_HISTORY_LIMIT - 1),
    ];
    user.passwordLastChanged = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Provide your phone number!",
    });
  }

  try {
    const user = await userModel.findOne({ phone: phone });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const expiryDate = Date.now() + 360000;

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = expiryDate;
    await user.save();

    const isSent = await sendOtp(phone, otp);
    if (!isSent) {
      return res.status(400).json({
        success: false,
        message: "Error Sending OTP Code!",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Send Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

const verifyOtpAndSetPassword = async (req, res) => {
  const { phone, otp, newPassword } = req.body;
  if (!phone || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing!",
    });
  }

  try {
    const user = await userModel.findOne({ phone: phone });

    if (user.resetPasswordOTP != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired!",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, randomSalt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP Verified and Password Updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};
const viewProfile = async (req, res) => {
  const id = req.user?.id; // Use optional chaining to avoid errors if req.user is undefined
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is missing",
    });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        // Use 404 for "User not found"
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Use error.message for a more readable error message
    });
  }
};

const updateProfile = async (req, res) => {
  const { fname, lname, phone, email } = req.body;
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID from middleware

  try {
    // Validate phone number format if it is provided
    if (phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        return res.json({
          success: false,
          message: "Invalid phone number format!",
        });
      }
    }

    console.log(req.body);

    // Update user details
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { fname, lname, phone, email },
        { new: true, runValidators: true }
      )
      .select("-password"); // Exclude password from the response

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      userData: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  verifyOtpAndSetPassword,
  viewProfile,
  updateProfile,
  changePassword
};
