const path = require("path");
const fs = require("fs");
const RatingComment = require("../models/ratingComment");
const Venue = require("../models/venueModel");

const createRatingComment = async (req, res) => {
  const { venueId, userId, rating, comment } = req.body;
  console.log("comment rating api called");
  try {
    // Validate required fields
    if (!venueId || !userId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Venue ID, User ID, and Rating are required",
      });
    }

    // Check if venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    // Optional: Check if user has already rated this venue
    const existingRating = await RatingComment.findOne({
      venue: venueId,
      user: userId,
    });
    if (existingRating) {
      console.log("already rated this venue");
      return res.status(404).json({
        success: false,
        message: "User has already rated this venue",
      });
    }
    console.log("still here");
    // Create a new rating comment
    const newRatingComment = new RatingComment({
      venue: venueId,
      user: userId,
      rating,
      comment,
    });

    // Save the rating comment to the database
    await newRatingComment.save();

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Rating comment added successfully",
      data: newRatingComment,
    });
  } catch (error) {
    console.error(error);
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {};

module.exports = {
  createRatingComment,
};
