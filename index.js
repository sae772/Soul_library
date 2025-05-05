const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

// Load environment variables from .env file
dotEnv.config();

// Setting up the port
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Body parser middleware to handle JSON requests
app.use(bodyParser.json());

// Enable CORS for all origins (adjust for specific use cases)
app.use(cors());

// Serve static files (images)
const imagesDirectory = path.join(__dirname, "images"); // Ensure this is correct for your project setup
app.use("/images", express.static(imagesDirectory)); // Ensure image directory is being accessed correctly

// API Routes
app.use("/user", userRoutes);
app.use("/api/images", imageRoutes);

// Default route
app.use("/", (req, res) => {
  res.send("<h3>Welcome To Soul Library</h3>");
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler for all routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
