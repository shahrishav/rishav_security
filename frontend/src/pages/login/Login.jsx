import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUserApi } from "../../apis/Api";

const BackgroundContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px); /* Adjust height based on header/footer height */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  width: 90%; /* Use percentage for responsiveness */
  max-width: 400px; /* Limit maximum width */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const StyledInput = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem; /* Adjust left padding if needed */
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #4ecdc4;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #ff6b6b;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 3rem; /* Position it slightly to the right */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #ff6b6b;
  padding: 0; /* Remove any default padding */
  margin: 0; /* Remove any default margin */
`;

const StyledButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  background: purple;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: blue;
  }
`;

const GoogleButton = styled(StyledButton)`
  background: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  margin-top: 1rem;

  &:hover {
    background: #f1f1f1;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [lockTime, setLockTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [notification, setNotification] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const startCountdown = (lockDuration) => {
    let remainingTime = lockDuration; // in seconds
    setTimer(remainingTime);

    const interval = setInterval(() => {
      remainingTime -= 1;
      setTimer(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimer(null);
        setLockTime(null);
        setNotification("");
      }
    }, 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
  
    const data = { email, password, captchaToken };
  
    try {
      const res = await loginUserApi(data);
  
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        setTimeout(() => {
          window.location.href =
            res.data.userData.role === "admin" ? "/admin" : "/user";
        }, 1000);
      } else if (res.status === 403) {
        const remainingTime = res.data.remainingTime;
        if (remainingTime) {
          setLockTime(remainingTime);
          setNotification(
            `Your account is locked. Try again in ${remainingTime} seconds.`
          );
          startCountdown(remainingTime);
        }
        toast.error(res.data.message || "Account is locked!");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };
  
  return (
    <BackgroundContainer>
      <StyledCard
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center mb-3" style={{ color: "black" }}>
          Hello!
          <h3>Ready to explore?</h3>
        </h3>
        {notification && (
          <div className="notification" style={{ color: "red" }}>
            {notification}
          </div>
        )}
        {lockTime && timer && (
          <div className="lock-message" style={{ color: "red" }}>
            Your account is locked. Try again in {timer} seconds.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <StyledInput>
            <AiOutlineMail size={20} />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </StyledInput>
          <StyledInput>
            <AiOutlineLock size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </PasswordToggle>
          </StyledInput>
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6Lcy48EqAAAAAJYrjn_iXM5FZf8yF_jUb8q1_1ZB" // Replace with your actual site key
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
          <StyledButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!!lockTime}
          >
            Login
          </StyledButton>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "red" }}>
              Sign up
            </Link>
          </p>
          <p className="text-center">
            <Link to="/forgot_password" style={{ color: "purple" }}>
              Forgot password?
            </Link>
          </p>
        </form>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default Login;