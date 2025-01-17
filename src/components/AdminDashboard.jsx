import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [buildName, setBuildName] = useState("");
  const [description, setDescription] = useState("");
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      const querySnapshot = await getDocs(collection(db, "builds"));
      setBuilds(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchBuilds();
  }, []);

  const handleSaveBuild = async () => {
    await addDoc(collection(db, "builds"), {
      name: buildName,
      description,
      createdAt: new Date(),
    });
    setBuildName("");
    setDescription("");
    // Refresh builds list
    const querySnapshot = await getDocs(collection(db, "builds"));
    setBuilds(querySnapshot.docs.map((doc) => doc.data()));
  };

  return (
    <Box>
      <Typography variant="h4">Crear Nueva Build</Typography>
      <TextField
        label="Nombre de la Build"
        value={buildName}
        onChange={(e) => setBuildName(e.target.value)}
      />
      <TextField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSaveBuild}>Guardar Build</Button>
      <Typography variant="h4">Todas las Builds</Typography>
      {builds.map((build, index) => (
        <Box key={index}>
          <Typography variant="h6">{build.name}</Typography>
          <Typography>{build.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AdminDashboard;