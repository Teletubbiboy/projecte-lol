import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BuildCreator from "./components/BuildCreator";
import Authentication from "./components/Authentication";
import { Box, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build-creator" element={<BuildCreator />} />
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;