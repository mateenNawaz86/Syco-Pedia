import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlines,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/system";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  // Define some states
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth__token); // Grabe logged-In user token
  const loggedInUser = useSelector((state) => state.user._id); // grabe logged_in user ID
  const isLiked = Boolean(likes[loggedInUser]);

  //   grabe some colours from theme.js
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //   Function for handling the post like
  const postLikeHandler = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser }),
    });

    // Return entire post as a response
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return <></>;
};

export default PostWidget;
