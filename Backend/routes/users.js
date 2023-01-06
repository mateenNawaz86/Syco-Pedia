import express from "express";
const router = express.Router();

import {
  getUser,
  getUserFriends,
  getUpdateUser,
} from "../controllers/usersController.js";

import { verifyToken } from "../middleware/auth";

// 1. ROUTE for getting user --> LOG-In required!
router.get("/:id", verifyToken, getUser);

// 2. ROUTE For getting a FRIENDS of specific user with ID
router.get("/:id/friends", verifyToken, getUserFriends);

// 3. ROUTE For Update the User INFO & friend --> LOG-In Required!
router.patch("/:id/:friendId", verifyToken, getUpdateUser);

export default router;
