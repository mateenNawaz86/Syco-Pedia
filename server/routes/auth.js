import express from "express";
const router = express.Router();
import { sign_in } from "../controllers/authController.js";

// import the middleware for validation
import { validateUser, validate } from "../middleware/validator.js";

// 1. Route for signin user --> Login NOT required!
router.post("/signin", validateUser, validate, sign_in);

export default router;
