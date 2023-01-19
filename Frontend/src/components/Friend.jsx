import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImg from "../components/UserImg";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _id = useSelector((state) => state.user); // Grabe logged-In user id
  const token = useSelector((state) => state.auth__token); // Grabe logged-In user token
  const friends = useSelector((state) => state.user.friends); //Grabe logged-in friend

  //   grabe some colours from theme.js
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check whether they are friend or NOT
  const isFriend = friends.find((friend) => friend._id === friendId);

  //   Function for add or remove friend from list
  const friendHandler = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data })); // update the initial state
  };
  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImg image={userPicturePath} />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0); // referesh the page when we see friend profile
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>

            <IconButton
              onClick={() => friendHandler()}
              sx={{ backgroundColor: primaryLight, p: "0.5rem" }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Friend;
