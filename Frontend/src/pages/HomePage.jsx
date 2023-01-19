import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import AllPostsWidget from "./widgets/AllPostsWidget";
import MyPostWidget from "./widgets/MyPostWidget";
import UserWidget from "./widgets/UserWidget";

const HomePage = () => {
  // Assign width to web-page
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");

  // Grabe user INFO
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonResponsive ? "flex" : "block"}
        justifyContent="space-between"
        gap="0.5rem"
      >
        <Box flexBasis={isNonResponsive ? "25%" : undefined}>
          <UserWidget userId={_id} userPicPath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonResponsive ? "42%" : undefined}
          mt={isNonResponsive ? undefined : "2rem"}
        >
          <MyPostWidget myPicturePath={picturePath} />
          <AllPostsWidget userId={_id} />
        </Box>
        {isNonResponsive && <Box flexBasis="25%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
