import React, { useState } from "react";

// Icons import from MUI
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

// Components import from MUI
import {
  Box,
  InputBase,
  Divider,
  Button,
  IconButton,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

// packages imports
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImg from "../../components/UserImg";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(null); // State for managing the image uplaod
  const [image, setImage] = useState(false);
  const [post, setPost] = useState(""); // State for managing the actual post content
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth__token);

  const isNonResponsive = useMediaQuery("(min-width:1000px)");

  // grabe some colors from theme.js
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Function for handle the post update
  const postHandler = async () => {
    const formData = formData(); // Use when we passing an image using FORM
    formData.append("userId", _id);
    formData.append("description", post);

    // IF ther is an image then grabing the picture key from backend
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:5000/api/posts`, {
      method: "POST",
      headers: { Authorization: `${token}` }, // here we pass token to server
      body: formData,
    });

    const posts = await response.json(); // convert javascript object into JSON
    dispatch(setPost({ posts })); // set value of post to current post with addition
    setImage(null);
    setPost("");
  };

  return <div></div>;
};

export default PostWidget;
