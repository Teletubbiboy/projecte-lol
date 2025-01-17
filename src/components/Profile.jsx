import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = ({ userId }) => {
  const [builds, setBuilds] = useState([]);
  const [runes, setRunes] = useState([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      const q = query(collection(db, "builds"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setBuilds(querySnapshot.docs.map((doc) => doc.data()));
    };

    const fetchRunes = async () => {
      const q = query(collection(db, "runes"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setRunes(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchBuilds();
    fetchRunes();
  }, [userId]);

  return (
    <Box>
      <Typography variant="h4">Mis Builds</Typography>
      {builds.map((build) => (
        <Typography key={build.id}>{build.name}</Typography>
      ))}
      <Typography variant="h4">Mis Runas</Typography>
      {runes.map((rune) => (
        <Typography key={rune.id}>{rune.name}</Typography>
      ))}
    </Box>
  );
};

export default Profile;