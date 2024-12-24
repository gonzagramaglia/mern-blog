import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
  getUsers,
  test,
} from "../controllers/user.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyUser, getUsers);

export default router;
