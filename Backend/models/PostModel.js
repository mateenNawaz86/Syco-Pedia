import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema for POST
const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  picturePath: String,
  userProfilePath: String,
  likes: {
    type: Map,
    of: Boolean,
  },

  comments: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the Schema
const Post = mongoose.model("Post", postSchema);
export default Post;
