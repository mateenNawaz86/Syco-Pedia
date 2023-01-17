import React from "react";
import { Box } from "@mui/material";

// widget component for user image
const UserImg = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size} display="flex" alignItems="center">
      <img
        src={`http://localhost:5000/assets/${image}`}
        alt="userImg"
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};

export default UserImg;
