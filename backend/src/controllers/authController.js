import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

import asyncHandler from "../utils/asyncHandler.js";

export const registerUser =
  asyncHandler(
    async (req, res) => {
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
        res.status(400);

        throw new Error(
          "All fields are required"
        );
      }

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        res.status(400);

        throw new Error(
          "User already exists"
        );
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
    }
  );

export const loginUser =
  asyncHandler(
    async (req, res) => {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        !user ||
        !(await user.matchPassword(
          password
        ))
      ) {
        res.status(401);

        throw new Error(
          "Invalid credentials"
        );
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
    }
  );