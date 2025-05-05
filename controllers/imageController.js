// controllers/imageController.js
const path = require("path");
const fs = require("fs");

// Controller for getting a list of images in a specific category
const getImagesByCategory = (req, res) => {
  const category = req.params.category;
  const imageFolderPath = path.join(__dirname, "..", "images", category);

  fs.readdir(imageFolderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read images directory" });
    }

    // Filter files to only include images
    const imageFiles = files.filter((file) => file.match(/\.(jpg|jpeg|png)$/i));
    res.json(imageFiles);
  });
};

// Controller for getting an individual image by category and id
const getImageById = (req, res) => {
  const category = req.params.category;
  const imageId = req.params.id;
  const imagePath = path.join(__dirname, "..", "images", category, imageId);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
};

// Controller for getting all books (all images across categories)
const getAllBooks = (req, res) => {
  const categories = [
    "devoteebooks",
    "textbooks",
    "storybooks",
    "cookingbooks",
  ];
  let allImages = [];

  categories.forEach((category) => {
    const imageFolderPath = path.join(__dirname, "..", "images", category);
    const files = fs.readdirSync(imageFolderPath);
    const categoryImages = files.filter((file) =>
      file.match(/\.(jpg|jpeg|png)$/i)
    );
    allImages = [...allImages, ...categoryImages];
  });

  res.json(allImages);
};

module.exports = { getImagesByCategory, getImageById, getAllBooks };
