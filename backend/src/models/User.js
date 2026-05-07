import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
      },

      bookmarks: [
        {
          type:
            mongoose.Schema.Types
              .ObjectId,

          ref: "Story",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

/*
========================================
HASH PASSWORD BEFORE SAVE
========================================
*/

userSchema.pre(
  "save",
  async function (next) {
    if (
      !this.isModified(
        "password"
      )
    ) {
      return next();
    }

    this.password =
      await bcrypt.hash(
        this.password,
        10
      );

    next();
  }
);

/*
========================================
COMPARE PASSWORD METHOD
========================================
*/

userSchema.methods.matchPassword =
  async function (
    enteredPassword
  ) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

const User = mongoose.model(
  "User",
  userSchema
);

export default User;