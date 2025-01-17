import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const BuildCreator = () => {
  const [buildName, setBuildName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSaveBuild = async () => {
    if (user) {
      await addDoc(collection(db, "builds"), {
        userId: user.uid,
        name: buildName,
        description,
        createdAt: new Date(),
      });
      setBuildName("");
      setDescription("");
      navigate("/");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Crear Nueva Build</Typography>
      <TextField
        label="Nombre de la Build"
        value={buildName}
        onChange={(e) => setBuildName(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveBuild}>
        Guardar Build
      </Button>
    </Box>
  );
};

export default BuildCreator;