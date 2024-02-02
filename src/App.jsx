/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { CreateMeet } from "./pages/CreateMeet";
import { JoinMeet } from "./pages/JoinMeet";
import { Meet } from "./pages/Meet";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateMeet />} />
        <Route path="/join" element={<JoinMeet />} />
        <Route path="/meet" element={<Meet />} />
      </Routes>
    </ThemeProvider>
  );
};
