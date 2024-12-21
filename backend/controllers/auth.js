import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

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

  if (password.length < 6) {
    return next(
      errorHandler(400, "Password must be at least 6 characters long.")
    );
  }

  if (username.length < 4 || username.length > 20 || username.includes(" ")) {
    return next(
      errorHandler(
        400,
        "Username must be between 4 and 20 characters long and cannot contain any spaces."
      )
    );
  }

  if (username.match(/^[a-zA-Z0-9_]*$/)) {
    return next(
      errorHandler(
        400,
        "Username can only contain letters, numbers, and underscores."
      )
    );
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: hashedPassword,
  });

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
    const validUser = await User.findOne({ email: email.toLowerCase() });
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
        isAdmin: validUser.isAdmin, // payload
      },
      JWT_SECRET, // private key
      { expiresIn: "1d" } // [options] not required
    ); // [callback] not required
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // security layer
      })
      .json(validUser);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoURL } = req.body;
  try {
    const user = await User.findOne({ email });
    // if user already exists, sign in
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        JWT_SECRET
      ); // payload + private key (both always required)
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // security layer. https://youtube.com/clip/UgkxGAnoi5Il4a4jFXSEox2-glcogf8l0igx
        })
        .json(rest);
    } else {
      // if user doesnt exist in the database, create a new user...
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 18);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      // ...and then sign in with the new user
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        JWT_SECRET
      ); // payload + private key (both always required)
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true, // security layer. https://youtube.com/clip/UgkxGAnoi5Il4a4jFXSEox2-glcogf8l0igx
        })
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};
