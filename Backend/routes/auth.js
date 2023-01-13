import express from "express";
const router = express.Router();
import { sign_in } from "../controllers/authController.js";

// 1. Route for signin user --> Login NOT required!
router.post("/signin", sign_in);

export default router;
