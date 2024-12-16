import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email == "" ||
    username == "" ||
    password == ""
  ) {
    return res.status(400).json({ message: "All field are required." });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, password: hashedPassword });

  try {
    await newUser.save();
    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
