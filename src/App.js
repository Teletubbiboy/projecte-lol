import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductGrid from "./components/RunesGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/RunesDetails";
import AdminDashboard from "./components/AdminDashboard";
import Authentication from "./components/Authentication"; // Importa el component d'autenticació
import { Box, CssBaseline } from "@mui/material";
 
const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Assegura que el Footer sempre quedi al final
        }}
      >
        {/* CssBaseline assegura un estil consistent */}
        <CssBaseline />
        {/* Barra de navegació */}
        <Navbar />
        {/* Configuració de rutes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ProductGrid />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/authentication" element={<Authentication />} /> {/* Ruta afegida */}
        </Routes>
        {/* Peu de pàgina */}
        <Footer />
      </Box>
    </Router>
  );
};
 
export default App;
