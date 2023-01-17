import React, { useState } from "react";

// Icons import from MUI
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
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
import { setPosts } from "../../state";

const PostWidget = ({ myPicturePath }) => {
  const [isImage, setIsImage] = useState(false); // State for managing the image uplaod
  const [image, setImage] = useState(null);
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
    const formData = new FormData(); // Use when we passing an image using FORM
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
    dispatch(setPosts({ posts })); // set value of post to current post with addition
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImg image={myPicturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            padding: "10px 2rem ",
            ml: "10px",
            borderRadius: "2rem",
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>

      {/* Code for upload image section start */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* Dropzone used for upload the image */}
          <Dropzone
            aceepetedFile=".jpg, .jpeg, .png" // Accept files only with this format
            multiple={false}
            onDrop={(
              acceptedFiles // Method for handling uploading picture
            ) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()} // Only write code like this in MUI
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {/* Code for uploading a picture  */}
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Upload your Image</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* Add some Icons */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {/* Code for upload image section end */}

      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Add few icons below */}
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer" }, color: medium }}
          >
            Image
          </Typography>
        </FlexBetween>

        {/* Code for Bigger Screens start */}
        {isNonResponsive ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => setImage(!image)}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setImage(!image)}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setImage(!image)}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* Code for Bigger Screens end */}

        <Button
          disabled={!post}
          onClick={postHandler}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
