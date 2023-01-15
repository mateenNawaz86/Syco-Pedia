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
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";

const Navbar = () => {
  // control state for Mobile screens responsive
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grabe user state from Redux STORE
  const user = useSelector((state) => state.user);
  // const mode = useSelector((state) => state.mode);

  // set Media-Query using MUI hook
  const isNonResponsive = useMediaQuery("(min-width:1000px)");

  // MUI theme used for controlling theme
  const theme = useTheme();

  // Grabe all colors from theme.js using MUI theme hook
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Grabe user FULLNAME
  const fullName = `${user.name}`;

  return (
    <FlexBetween padding="1rem 5%" backgroundColor={alt}>
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
          BlackB00k
        </Typography>
        {isNonResponsive && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* NAVBAR FOR DESKTOP VIEW */}
      {isNonResponsive ? (
        <FlexBetween gap="2rem">
          {/* Code for switch the mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message
            sx={{
              fontSize: "25px",
              "&:hover": {
                cursor: "pointer",
                color: "#488AFF",
              },
            }}
          />
          <Notifications
            sx={{
              fontSize: "25px",
              "&:hover": {
                cursor: "pointer",
                color: "#E74C2D",
              },
            }}
          />
          <Help
            sx={{
              fontSize: "25px",
              "&:hover": {
                cursor: "pointer",
                color: "#234796",
              },
            }}
          />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMenuToggled(!isMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAVBAR VIEW START*/}
      {!isNonResponsive && isMenuToggled && (
        <Box
          position="fixed"
          right="0"
          top="0"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          pb="1.5rem"
        >
          {/* CLOSE ICON START */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          {/* CLOSE ICON END */}

          {/* MENU ITEM START */}
          <FlexBetween
            flex="flex"
            flexDirection="column"
            justifyContent="center"
            gap="2rem"
          >
            {/* Code for switch the mode */}
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message
              sx={{
                fontSize: "25px",
                "&:hover": {
                  cursor: "pointer",
                  color: "#488AFF",
                },
              }}
            />
            <Notifications
              sx={{
                fontSize: "25px",
                "&:hover": {
                  cursor: "pointer",
                  color: "#E74C2D",
                },
              }}
            />
            <Help
              sx={{
                fontSize: "25px",
                "&:hover": {
                  cursor: "pointer",
                  color: "#234796",
                },
              }}
            />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
          {/* MENU ITEM END */}
        </Box>
      )}
      {/* MOBILE NAVBAR VIEW END*/}
    </FlexBetween>
  );
};

export default Navbar;
