const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.whatIsYourName;

const userRegister = async (req, res) => {
    const { userName, email, phoneNumber, password } = req.body;
    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({message:"email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
          userName,
          email,
          phoneNumber,
          password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({ message: "User Registered Successfully" });
        console.log("user Registered")

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
        return  res.status(404).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: "user._id" }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login Successfull", token });
        console.log("login succesfull", token)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
}
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal server error" });
    }
}

module.exports = { userRegister, userLogin, getAllUsers, getUserById };