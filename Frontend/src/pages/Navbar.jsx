import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  NotificationAdd,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";

const Navbar = () => {
  // control state for Mobile screens responsive
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grabe user state from Redux STORE
  const user = useSelector((state) => state.user);

  // set Media-Query using MUI hook
  const isNonResponsive = useMediaQuery("(min-width: 768px)");

  // MUI theme used for controlling theme
  const theme = useTheme();

  // Grabe all colors from theme.js using MUI theme hook
  const neutralLight = theme.palette.light;
  const dark = theme.palette.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Grabe user FULLNAME
  const fullName = `${user.name}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          // 1rem = Minvalue, 2rem = PreferedValue, 2.25rem = MaxValue
          fontSize="clamp(1rem, 2rem ,2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SycoPedia
        </Typography>
        {isNonResponsive && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search...">
              <IconButton>
                <Search />
              </IconButton>
            </InputBase>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* NAVBAR FOR DESKTOP VERSION */}
      {isNonResponsive ? (
        <FlexBetween gap="2rem">
          {/* Code for switch the mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: "dark", fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <NotificationAdd sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
              }}
            ></Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton></IconButton>
      )}
    </FlexBetween>
  );
};

export default Navbar;
