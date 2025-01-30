const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingCommentSchema = new Schema({
  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Assuming a rating scale from 1 to 5
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RatingComment", ratingCommentSchema);
