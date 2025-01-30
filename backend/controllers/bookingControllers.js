const VenueBooking = require("../models/bookingModel"); // Adjust the path as necessary
const Venue = require("../models/venueModel");
const User = require("../models/userModel");

// Controller function for creating a venue booking
const createVenueBooking = async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      userId,
      venueId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
    } = req.body;

    // Check if required fields are provided
    if (
      !userId ||
      !venueId ||
      !checkInDate ||
      !checkOutDate ||
      !numberOfGuests ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // user and venue exists or not
    // Add the venue to the category
    const venue = await Venue.findById(venueId);
    if (!venue) {
      console.log("Validation Error: Venue not found", { venueId });
      // Clean up: Delete the uploaded image if the category is invalid
      // fs.unlinkSync(imageUploadPath);
      return res.status(400).json({
        success: false,
        message: "Venue not found",
      });
    }

    console.log("venue:", venue);

    // Add the venue to the category
    const user = await User.findById(userId);
    if (!user) {
      console.log("Validation Error: User not found", { userId });
      // Clean up: Delete the uploaded image if the category is invalid
      // fs.unlinkSync(imageUploadPath);
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("user:", user);

    // Create a new venue booking instance
    const newVenueBooking = new VenueBooking({
      user: userId,
      venue: venueId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfGuests: numberOfGuests,
      totalPrice: totalPrice,
    });

    // Save the booking to the database
    const savedBooking = await newVenueBooking.save();

    // Respond with the saved booking
    res.status(201).json({
      message: "Venue booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating venue booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await VenueBooking.find({ user: userId }).populate(
      "venue"
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found!!!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await VenueBooking.find().populate("venue");

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found!!!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createVenueBooking,
  getBookingsByUser,
  getAllBookings,
};
