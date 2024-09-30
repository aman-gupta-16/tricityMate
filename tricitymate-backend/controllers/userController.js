import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed in the User model
      role,
    });

    // Send back the token and user data
    res.status(201).json({
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in registration", error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error in login", error: error.message });
  }
};

//Logout

// Get user profile - Protected route
export const getUserProfile = async (req, res) => {
  try {
    // Access user details from req.user (set by protect middleware)
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile - Protected route
export const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Get user ID from req.user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Hash new password
    }

    await user.save(); // Save updated user

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
