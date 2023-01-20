import React, { useState, useEffect } from "react";

// Import some icons from MUI
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImg from "../../components/UserImg";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, userPicPath }) => {
  // State for managing the user
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth__token);

  //   Grabe colors from theme.js
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  //  Function for getting the user info from backend database
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `${token}` }, // here we pass token to server
    });
    // Get response from server API
    const data = await response.json();
    setUser(data); // set initial user widget with response data
  };

  // Whenever the page load useEffect code calls
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IF user NOT exist
  if (!user) {
    return null;
  }

  const { name, location, occupation, viewedProfile, impressions, friends } =
    user;

  return (
    <WidgetWrapper>
      {/* First Row start*/}
      <FlexBetween
        pb="1rem"
        gap="0.5rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImg image={userPicPath} />
          <Box>
            <Typography
              variant="h5"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ color: "#57ADEE" }} />
      </FlexBetween>
      {/* First Row end*/}

      <Divider />

      {/* Second Row Start */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: "#961B1A" }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: "#57ADEE" }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      {/* Second Row end */}
      <Divider />

      {/* Third Row Start */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions on your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      {/* Third Row End */}
      <Divider />
      {/* Fourth Row Start */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* First Social link start */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <TwitterIcon sx={{ color: "#57ADEE" }} />
            <Box>
              <Typography color="main" fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color={main} />
        </FlexBetween>
        {/* First Social link end */}

        {/* Second Social link start */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <LinkedInIcon sx={{ color: "#356E9F" }} />
            <Box>
              <Typography color="main" fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined color={main} />
        </FlexBetween>
        {/* Second Social link end */}
      </Box>

      {/* Fourth Row end */}
    </WidgetWrapper>
  );
};

export default UserWidget;
