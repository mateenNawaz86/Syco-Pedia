import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

// 1. controller for Signup --> Login NOT required!
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // here we create a salt of password
    const salt = await bcrypt.genSalt(10);
    const pswHash = await bcrypt.hash(password, salt);

    // Check whether the user already exist
    let user = await User.findOne({ email: email });

    // check if the user is already exists or NOT
    if (user) {
      return res.status(400).json({
        error: "User already exists with that email address",
      });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: pswHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Saved a new user
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Controller for Sign in --> Login NOT required!
export const sign_in = async (req, res) => {
  try {
    // Destructure data from request body
    const { email, password } = req.body;

    // check whether the user exist with this email address or NOT
    const user = await User.findOne({ email: email });

    // Send error if user NOT exist
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address!" });
    }

    // if user exist with entered email
    const comparePsw = await bcrypt.compare(password, user.password);

    // if password is NOT matched
    if (!comparePsw) {
      return res
        .status(400)
        .json({ message: "Please enter a valid credentials!" });
    }

    // If user entered a valid credentials return a JWT token
    const auth__token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    // Delete the PSW NOT send back to client
    delete user.password;

    // Send a response
    res.status(200).json({ auth__token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
