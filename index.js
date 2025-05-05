const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors"); 
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();
dotEnv.config();

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
    .catch((err) => {
      console.log("mongodb connection failed", err)
    });
app.use(bodyparser.json());
app.use(cors());
 // Serve static images from the images folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRoutes)


// Use image-related routes
app.use("/api/images", imageRoutes);

app.use("/home", (req, res) => {
  res.send("<h3>Welcome To</h3>");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server started at ${PORT}`);
});
