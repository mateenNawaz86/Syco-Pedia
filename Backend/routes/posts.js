import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import {
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";

// 1. ROUTE for READ Logged-In user Posts
router.get("/", verifyToken, getAllPosts);

// 2. ROUTE for READ Logged-In user POSTS
router.get("/:userId/posts", verifyToken, getUserPosts);

// 3. Route for like the post
router.patch("/:id/like", verifyToken, likePost);

export default router;
