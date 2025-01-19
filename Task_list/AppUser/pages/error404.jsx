import React from "react";
import "./components/styles/Loginfield.css";
import { Box } from "@mui/material";
export function Error404() {
  return (
    <Box className="login-Box">
      <h1>404</h1>
      <p>Page not Found.</p>
      <p>Try searching for something else.</p>
    </Box>
  );
}
