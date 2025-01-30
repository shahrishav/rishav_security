const path = require("path");
const fs = require("fs");
const Venue = require("../models/venueModel");
const Category = require("../models/categoryModel");
const RatingComment = require("../models/ratingComment");

// Create a new venue with image upload
const createVenue = async (req, res) => {
  const { name, location, rating, categoryId, price } = req.body;
  console.log(req.body);

  // Validation
  if (!name || !location || rating == null || !categoryId || price == null) {
    console.log("Validation Error: Missing required fields", {
      name,
      location,
      rating,
      categoryId,
      price,
    });
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  // Validate if there is an image
  if (!req.files || !req.files.image) {
    console.log("Validation Error: Image not found", { files: req.files });
    return res.status(400).json({
      success: false,
      message: "Image not found",
    });
  }

  const { image } = req.files;

  // Generate a new image name (unique identifier)
  const imageName = `${Date.now()}-${image.name}`;

  // Define the upload path
  const imageUploadPath = path.join(__dirname, `../public/venues/${imageName}`);

  try {
    // Move the image to the upload directory
    await image.mv(imageUploadPath);

    // Save venue information to the database with the image name and price
    const newVenue = new Venue({
      name: name,
      location: location,
      rating: rating,
      image: imageName,
      category: categoryId,
      price: price, // Add price here
    });

    const venue = await newVenue.save();

    // Add the venue to the category
    const category = await Category.findById(categoryId);
    if (!category) {
      console.log("Validation Error: Category not found", { categoryId });
      // Clean up: Delete the uploaded image if the category is invalid
      fs.unlinkSync(imageUploadPath);
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    console.log("category:", category);

    category.venues.push(venue._id);
    await category.save();

    res.status(201).json({
      success: true,
      message: "Venue created successfully",
      data: venue,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    // Clean up: Delete the uploaded image if any error occurs during the process
    if (fs.existsSync(imageUploadPath)) {
      fs.unlinkSync(imageUploadPath);
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// const createVenue = async (req, res) => {
//     const { name, location, rating, categoryId } = req.body;

//     // Validation
//     if (!name || !location || rating == null || !categoryId) {
//         console.log("Validation Error: Missing required fields", { name, location, rating, categoryId });
//         return res.status(400).json({
//             success: false,
//             message: "Please enter all the required fields",
//         });
//     }

//     try {
//         // Save venue information to the database without the image name
//         const newVenue = new Venue({
//             name: name,
//             location: location,
//             rating: rating,
//             category: categoryId
//         });

//         const venue = await newVenue.save();

//         // Add the venue to the category
//         const category = await Category.findById(categoryId);
//         if (!category) {
//             console.log("Validation Error: Category not found", { categoryId });
//             return res.status(400).json({
//                 success: false,
//                 message: "Category not found",
//             });
//         }

//         category.venues.push(venue._id);
//         await category.save();

//         res.status(201).json({
//             success: true,
//             message: "Venue created successfully",
//             data: venue,
//         });
//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };

// Fetch all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find()
      .populate({
        path: "ratingComments",
        model: "RatingComment",
      })
      .populate("category")
      .exec();
    res.status(200).json({
      success: true,
      message: "Venues fetched successfully",
      data: venues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fetch a single venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)
      .populate("category")
      .exec();
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Venue fetched successfully",
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a venue by ID with image handling
const updateVenue = async (req, res) => {
  try {
    // Check if a new image is uploaded
    if (req.files && req.files.image) {
      const { image } = req.files;

      // Generate a new image name
      const imageName = `${Date.now()}-${image.name}`;

      // Define the upload path
      const imageUploadPath = path.join(
        __dirname,
        `../public/venues/${imageName}`
      );

      // Move the new image to the upload directory
      await image.mv(imageUploadPath);

      // Find the existing venue
      const existingVenue = await Venue.findById(req.params.id);
      if (!existingVenue) {
        return res.status(404).json({
          success: false,
          message: "Venue not found",
        });
      }

      // Remove the old image from the file system
      const oldImagePath = path.join(
        __dirname,
        `../public/venues/${existingVenue.image}`
      );
      fs.unlinkSync(oldImagePath);

      // Update the image name in the request body
      req.body.image = imageName;
    }

    // Update the venue information including the price
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Venue updated successfully",
      data: updatedVenue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a venue by ID
const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    // Remove the image from the file system
    const imagePath = path.join(__dirname, `../public/venues/${venue.image}`);
    fs.unlinkSync(imagePath);

    // Remove the venue from the category
    await Category.updateOne(
      { _id: venue.category },
      { $pull: { venues: venue._id } }
    );

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Pagination for venues
const paginationVenues = async (req, res) => {
  const pageNo = parseInt(req.query.page) || 1;
  const resultPerPage = parseInt(req.query.limit) || 3; // Set default to 1

  const { categoryId } = req.query; // Get the categoryId from query params

  try {
    // Query to filter by categoryId if provided
    const query = categoryId ? { category: categoryId } : {};

    // Fetch venues with pagination
    const venues = await Venue.find(query)
      .skip((pageNo - 1) * resultPerPage)
      .limit(resultPerPage)
      .populate("category");

    const totalItems = await Venue.countDocuments(query);

    if (venues.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No venues found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venues fetched successfully",
      data: venues,
      totalItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getVenuesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const venues = await Venue.find({ category: categoryId }).populate(
      "category"
    );
    if (venues.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No venues found for this category",
      });
    }
    res.status(200).json({
      success: true,
      message: "Venues fetched successfully",
      data: venues,
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
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  paginationVenues,
  getVenuesByCategory,
};
