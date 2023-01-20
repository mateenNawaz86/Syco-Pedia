import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth__token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <WidgetWrapper>
      <Typography
        color={main}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1rem", color: "#DF2C2B" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1rem">
        {friends.map((item) => {
          <Friend
            key={item._id}
            friendId={item._id}
            name={item.name}
            subtitle={item.occupation}
            userPicturePath={item.picturePath}
          />;
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
