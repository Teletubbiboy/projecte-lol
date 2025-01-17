import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardContent, CardActions, Grid } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Home = () => {
  const [builds, setBuilds] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBuilds = async () => {
      if (user) {
        const q = query(collection(db, "builds"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setBuilds(querySnapshot.docs.map((doc) => doc.data()));
      }
    };

    fetchBuilds();
  }, [user]);

  const handleCreateBuild = () => {
    navigate("/build-creator");
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Mis Builds
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateBuild} sx={{ marginBottom: "20px" }}>
        Crear Nueva Build
      </Button>
      <Grid container spacing={3} justifyContent="center">
        {builds.map((build, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {build.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {build.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;