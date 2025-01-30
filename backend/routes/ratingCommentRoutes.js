const express = require("express");
const ratingCommentController = require("../controllers/ratingCommentController");
const router = express.Router();

// Route to create a rating comment
router.post("/create", ratingCommentController.createRatingComment);

module.exports = router;