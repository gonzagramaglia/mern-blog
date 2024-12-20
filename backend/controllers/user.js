import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Unauthorized to update this user."));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long.")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  if (req.body.username) {
    req.body.username = req.body.username.trim();
    if (req.body.username.length < 4 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 4 and 20 characters long.")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain any spaces."));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9_]*$/)) {
      return next(
        errorHandler(
          400,
          "Username can only contain letters, numbers, and underscores."
        )
      );
    }
    req.body.username = req.body.username.toLowerCase();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          profilePicture: req.body.profilePicture,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Unauthorized to delete this user."));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User has been deleted." });
  } catch (err) {
    next(err);
  }
};
