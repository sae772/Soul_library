// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

// Route for listing all images in a specific category
router.get("/:category", imageController.getImagesByCategory);

// Route for getting a specific image by category and id
router.get("/:category/:id", imageController.getImageById);

// Route for getting all books (images from all categories)
router.get("/all", imageController.getAllBooks);

module.exports = router;
