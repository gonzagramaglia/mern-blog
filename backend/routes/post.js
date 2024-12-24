import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletePost);
router.put("/updatepost/:postId/:userId", verifyUser, updatePost);

export default router;
