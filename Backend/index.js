import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { connectedToMongo } from "./database.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import { createPost } from "./controllers/postController.js";
import { verifyToken } from "./middleware/auth.js";
// import { users, posts } from "./data/index.js";
// import User from "./models/UserModel.js";
// import Post from "./models/PostModel.js";

// For Signup route
import { validateUser, validate } from "./middleware/validator.js";
import { signup } from "./controllers/authController.js";

// Native packages
import path from "path";
import { fileURLToPath } from "url";

// CONFIGRATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Invoke cross-origin sharing policy
app.use(cors());

// path where we store the images locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE ==> code for how to save uploaded file on the local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Save incoming uploaded files
const upload = multer({ storage });

// connect to mongoDB
connectedToMongo();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Route for Handling User lOG_IN process --> ROUTES WITH FILES
app.use(
  "/api/signup",
  upload.single("picture"),
  validateUser,
  validate,
  signup
); // upload.single("picture") is middlreware function runs before hit the register route

// Route for Handling User POSTS --> ROUTES WITH FILES
app.use("/api/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/api", authRoute); // Login ROUTE
app.use("/users", userRoute); // Routes for getting user INFO
app.use("/posts", postRoute); // Routes for getting the users posts

// Run a nodejs APP
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  // Use this code just first time & then comment it out
  // User.insertMany(users);
  // Post.insertMany(posts);
});
