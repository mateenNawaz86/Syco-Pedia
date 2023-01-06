import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

// 1. Controller for create a new post --> Log-In required!
export const createPost = async (req, res) => {
  try {
    // Grabe userID, description, picturePath from requested User
    const { userId, description, picturePath } = req.body;

    // Find user with ID
    const user = await User.findById(userId);

    // Create a new Post
    const newPost = new Post({
      userId,
      name: user.name,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    // SAVE newPost
    await newPost.save();
    // Grabe all posts of LOGGED_IN user
    const post = await Post.find();
    // Send RESPONSE to Client, Here 201 show created something
    res.status(201).json(post);
  } catch (error) {
    // Here 409 HTTP code indicate that requested source NOT detact
    res.status(409).json({ message: error.message });
  }
};

// 2. Controller for READ Post
export const getPostsFeed = async (req, res) => {
  try {
    
    const post = await Post.find();
    // Send RESPONSE to Client, Here 200 show Successful response
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 2. Controller for Getting the user POSTS
export const getUserPosts = async (req, res) => {
  try {
    // Grabe user ID from request
    const { userId } = req.params;

    // Getting POST of Logged-In user with their ID
    const post = await Post.find({ userId });

    // RESPONSE back to Client
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE Controller for Handling Like functionality
export const likePost = async (req, res) => {
  try {
    // Getting ID from request params
    const { id } = req.params;

    // Getting user ID from requested body
    const { userId } = req.body;

    // Grabing the POST Info with ID
    const post = await Post.findById(id);

    // Check whether the Logged-In user liked or NOT
    const isLiked = post.likes.get(userId);

    // IF Logged-In user Liked before then Delete it
    if (isLiked) {
      post.likes.delete(userId);

      // IF User NOT liked Before then Liked it
    } else {
      post.likes.set(userId);
    }

    // UPDATE post after checking the current state
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Return result to UI
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
