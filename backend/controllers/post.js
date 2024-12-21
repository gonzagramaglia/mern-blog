import { errorHandler } from "../utils/error.js";
import Post from "../models/post.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields."));
  }
  const slug = req.body.title
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z-]/g, "");

  const newPost = new Post({
    userId: req.user.id,
    ...req.body,
    slug,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(errorHandler(500, "Internal Server Error"));
  }
};
