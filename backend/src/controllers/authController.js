import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      const user =
        await User.create({
          name,
          email,
          password,
        });

      res.status(201).json({
        success: true,

        token: generateToken(
          user._id
        ),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Registration failed",

        error: error.message,
      });
    }
  };

export const loginUser =
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      if (!email || !password) {
        return res.status(400).json({
          message:
            "Email and password are required",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid credentials",
        });
      }

      const isMatch =
        await user.matchPassword(
          password
        );

      if (!isMatch) {
        return res.status(401).json({
          message:
            "Invalid credentials",
        });
      }

      res.status(200).json({
        success: true,

        token: generateToken(
          user._id
        ),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Login failed",

        error: error.message,
      });
    }
  };