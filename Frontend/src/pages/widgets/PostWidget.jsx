import React, { useState } from "react";
import { ChatBubbleOutlineOutlined, ShareOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
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
  const loggedInUserId = useSelector((state) => state.user._id); // grabe logged_in user ID
  const isLiked = Boolean(likes[loggedInUserId]); // check whether post like or NOT
  const likeCount = Object.keys(likes).length; // for count the like

  //   grabe some colours from theme.js
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  //   Function for handling the post like
  const postLikeHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      // Return entire post as a response
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost })); // update post after like/dislike
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />

        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            className="w-full h-auto rounded-xl mt-3 "
            src={`http://localhost:5000/assets/${picturePath}`}
            alt="postImg"
          />
        )}

        {/* Code for icons start */}
        <FlexBetween className="mt-1">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={postLikeHandler}>
                {isLiked ? (
                  <FavoriteIcon sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton
                sx={{ color: primary }}
                onClick={() => setIsComments(!isComments)}
              >
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          {/* code for share icon start */}
          <IconButton>
            <ShareOutlined />
          </IconButton>
          {/* code for share icon end */}
        </FlexBetween>
        {/* Code for icons end */}

        {isComments && (
          <Box mt="0.5rem">
            {comments.map((item, index) => (
              <Box key={index}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comments}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
