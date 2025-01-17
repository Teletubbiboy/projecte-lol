import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Lógica para registrarse
  };

  const handleSignIn = () => {
    // Lógica para iniciar sesión
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {isSignUp ? "Registrarse" : "Iniciar Sesión"}
      </Typography>
      <TextField
        label="Correo Electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      {isSignUp && (
        <TextField
          label="Confirmar Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: "15px" }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={isSignUp ? handleSignUp : handleSignIn}
      >
        {isSignUp ? "Registrarse" : "Iniciar Sesión"}
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => setIsSignUp(!isSignUp)}
        sx={{ marginTop: "10px" }}
      >
        {isSignUp ? "¿Ya tienes una cuenta? Inicia Sesión" : "¿No tienes una cuenta? Regístrate"}
      </Button>
    </Box>
  );
};

export default Authentication;