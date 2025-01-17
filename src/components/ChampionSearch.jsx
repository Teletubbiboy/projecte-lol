import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const ChampionSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [champions, setChampions] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://api.example.com/champions?search=${searchTerm}`);
    const data = await response.json();
    setChampions(data);
  };

  return (
    <Box>
      <TextField
        label="Buscar Campeón"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Buscar</Button>
      <Box>
        {champions.map((champion) => (
          <Typography key={champion.id}>{champion.name}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ChampionSearch;