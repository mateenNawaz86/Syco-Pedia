import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../components/Form";

const LoginPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  // Use MUI Media-Query hook
  const isNonResponsive = useMediaQuery("(min-width:1000px)");
  return (
    <>
      <Box>
        <Box backgroundColor={alt} p="1rem 6%" width="100%" textAlign="center">
          <Typography
            fontWeight="bold"
            // 1rem = Minvalue, 2rem = PreferedValue, 2.25rem = MaxValue
            fontSize="32px"
            color="primary"
          >
            SycoPedia
          </Typography>
        </Box>

        <Box
          width={isNonResponsive ? "50%" : "90%"}
          p="2rem"
          m="2rem auto"
          backgroundColor={alt}
          borderRadius="10px"
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to SycoPedia
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
