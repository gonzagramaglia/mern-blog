import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email == "" ||
    username == "" ||
    password == ""
  ) {
    return next(errorHandler(400, "All fields are required."));
    // previously => return res.status(400).json({ message: "All fields are required." });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    return next(err);
    // previously => return res.status(500).json({ message: err.message }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required."));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password."));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json("Signin successful.");
  } catch (err) {
    next(err);
  }
};
