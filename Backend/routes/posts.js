import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import { getPostsFeed, getUserPosts } from "../controllers/postController.js";

// 1. ROUTE for READ Logged-In user Posts
router.post("/", verifyToken, getPostsFeed);

// 2. ROUTE for READ Logged-In user POSTS
router.post("/:userId/posts", verifyToken, getUserPosts);
