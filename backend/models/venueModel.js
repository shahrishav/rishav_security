const RatingComment = require("./ratingComment");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Virtual field for rating comments
venueSchema.virtual("ratingComments", {
  ref: "RatingComment",
  localField: "_id",
  foreignField: "venue",
});

// To include virtuals in JSON response
venueSchema.set("toJSON", { virtuals: true });
venueSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Venue", venueSchema);
