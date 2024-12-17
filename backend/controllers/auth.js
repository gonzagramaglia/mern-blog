import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
