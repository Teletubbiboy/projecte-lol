import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const BuildCreator = () => {
  const [buildName, setBuildName] = useState("");
  const [description, setDescription] = useState("");
  const [runes, setRunes] = useState([]);
  const [selectedRunes, setSelectedRunes] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    // Fetch runes from API
    const fetchRunes = async () => {
      const response = await fetch("https://api.example.com/runes");
      const data = await response.json();
      setRunes(data);
    };

    fetchRunes();
  }, []);

  const handleSaveBuild = async () => {
    if (user) {
      await addDoc(collection(db, "builds"), {
        userId: user.uid,
        name: buildName,
        description,
        runes: selectedRunes,
        createdAt: new Date(),
      });
      setBuildName("");
      setDescription("");
      setSelectedRunes([]);
      navigate("/"); // Navegar a la página principal después de guardar la build
    }
  };

  const handleRuneSelect = (rune) => {
    setSelectedRunes((prevSelectedRunes) => {
      if (prevSelectedRunes.includes(rune)) {
        return prevSelectedRunes.filter((r) => r !== rune);
      } else {
        return [...prevSelectedRunes, rune];
      }
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Crear Nueva Build de Runas
      </Typography>
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
      <Typography variant="h5" gutterBottom>
        Selecciona las Runas
      </Typography>
      <Grid container spacing={2}>
        {runes.map((rune) => (
          <Grid item xs={6} sm={4} md={3} key={rune.id}>
            <Card
              onClick={() => handleRuneSelect(rune)}
              sx={{
                cursor: "pointer",
                border: selectedRunes.includes(rune) ? "2px solid blue" : "none",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={rune.imageUrl}
                alt={rune.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {rune.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSaveBuild} sx={{ marginTop: "20px" }}>
        Guardar Build
      </Button>
    </Box>
  );
};

export default BuildCreator;