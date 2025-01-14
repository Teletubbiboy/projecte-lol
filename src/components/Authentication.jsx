import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirecciones

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const db = getFirestore();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate(); // Instancia de useNavigate

  const handleSubmit = async () => {
    setError(null);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;


        setUser(user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

      }

      // Redirige a la pantalla de inicio tras iniciar sesión
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Guarda el rol del usuario por defecto como "user"
      const userDocRef = doc(db, "User", user.uid);
      await setDoc(userDocRef, { email: user.email, role: "user" }, { merge: true });


      setUser(user);

      // Redirige a la pantalla de inicio tras iniciar sesión
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      {user ? (
        <Box>
          <Typography variant="h6">
            Bienvenido, {user.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleSignOut}
          >
            Cerrar Sesión
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            {isSignUp ? "Registro" : "Inicia Sesión"}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Alert>
          )}
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
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            {isSignUp ? "Regístrate" : "Inicia Sesión"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: "15px" }}
            onClick={handleGoogleSignIn}
          >
            Inicia Sesión con Google
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: "20px", cursor: "pointer" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "¿Ya tienes una cuenta? Inicia sesión."
              : "¿No tienes una cuenta? Regístrate."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Authentication;
