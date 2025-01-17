import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Link, Menu, MenuItem } from "@mui/material";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/authentication");
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Inicio
          </Link>
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "auto" }}>
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                style={{ fontWeight: "bold" }}
              >
                {user.displayName || user.email}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
              </Menu>
            </>
          ) : (
            <Link
              href="/authentication"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Inicia Sessió
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;