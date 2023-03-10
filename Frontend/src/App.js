import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// Theme setting imports
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const App = () => {
  // Select MODE state from Redux STORE
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.auth__token));

  // Set up MUI theme setting
  const themes = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} exact />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
            exact
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            exact
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
