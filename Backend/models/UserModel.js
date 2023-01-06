import mongoose from "mongoose";
import { Schema } from "mongoose";

// Sign up user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the userSchema is here
const User = mongoose.model("User", userSchema);
export default User;
