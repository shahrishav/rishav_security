const path = require("path");
const fs = require("fs");
const Category = require("../models/categoryModel");
const Venue = require("../models/venueModel");

// Create a new category with image upload
const createCategory = async (req, res) => {
    const { name } = req.body;

    // Validation
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Please enter the category name",
        });
    }

    // Validate if there is an image
    if (!req.files || !req.files.image) {
        return res.status(400).json({
            success: false,
            message: "Image not found",
        });
    }

    const { image } = req.files;

    // Generate a new image name (unique identifier)
    const imageName = `${Date.now()}-${image.name}`;

    // Define the upload path
    const imageUploadPath = path.join(__dirname, `../public/categorys/${imageName}`);

    try {
        // Move the image to the upload directory
        await image.mv(imageUploadPath);

        // Save category information to the database with the image name
        const newCategory = new Category({
            name,
            image: imageName, // Save image name to the database
        });

        const category = await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
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

// Fetch all categorys
const getAllCategorys = async (req, res) => {
    try {
        const categorys = await Category.find().populate('venues');
        res.status(200).json({
            success: true,
            message: "Categorys fetched successfully",
            data: categorys,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Fetch a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('venues');
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Update a category by ID with image handling
const updateCategory = async (req, res) => {
    try {
        // Check if a new image is uploaded
        if (req.files && req.files.image) {
            const { image } = req.files;

            // Generate a new image name
            const imageName = `${Date.now()}-${image.name}`;

            // Define the upload path
            const imageUploadPath = path.join(__dirname, `../public/categorys/${imageName}`);

            // Move the new image to the upload directory
            await image.mv(imageUploadPath);

            // Find the existing category
            const existingCategory = await Category.findById(req.params.id);
            if (!existingCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            // Remove the old image from the file system
            if (existingCategory.image) {
                const oldImagePath = path.join(__dirname, `../public/categorys/${existingCategory.image}`);
                fs.unlinkSync(oldImagePath);
            }

            // Update the image name in the request body
            req.body.image = imageName;
        }

        // Update the category information
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory,
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

// Delete a category by ID with image handling
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Remove the image from the file system
        if (category.image) {
            const imagePath = path.join(__dirname, `../public/categorys/${category.image}`);
            fs.unlinkSync(imagePath);
        }

        // Delete related venues
        for (const venueId of category.venues) {
            const venue = await Venue.findById(venueId);
            if (venue && venue.image) {
                const imagePath = path.join(__dirname, `../public/venues/${venue.image}`);
                fs.unlinkSync(imagePath);
            }
            await Venue.findByIdAndDelete(venueId);
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
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

// Pagination for categorys
const paginationCategorys = async (req, res) => {
    const pageNo = parseInt(req.query.page) || 1;
    const resultPerPage = parseInt(req.query.limit) || 2;

    try {
        const categorys = await Category.find()
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage)
            .populate('venues');

        const totalItems = await Category.countDocuments();

        if (categorys.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categorys found",
            });
        }

        res.status(201).json({
            success: true,
            message: "Categorys fetched successfully",
            data: categorys,
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

module.exports = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
    paginationCategorys,
};
