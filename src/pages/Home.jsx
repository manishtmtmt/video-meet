/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import videoMeet from "../assets/4911324.jpg";

export const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = React.useState("");

  const joinMeet = () => {
    if (!roomCode.trim()) {
      alert("Room code is required!");
      setRoomCode("");
      return;
    }
    navigate("/join", { state: { roomCode } });
  };

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        md={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CardMedia component={"img"} image={videoMeet} sx={{ width: "80%" }} />
      </Grid>
      <Grid
        item
        md={6}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography component={"h2"} variant="h2" fontWeight={"bold"}>
          Video Meet APP
        </Typography>
        <Typography fontStyle={"italic"} color={"grey"} p={2}>
          Experience the future of virtual communication with our video meet
          app. Enjoy crystal-clear video calls with multiple participants,
          engage in lively group chats, and effortlessly create or join meets
          for seamless connections anytime, anywhere. Elevate your online
          interactions with ease and simplicity.
        </Typography>
        <Box width={"60%"} display={"flex"} flexDirection={"column"} gap={2}>
          <Box border={"1px solid"}>
            <Button
              variant="contained"
              onClick={() => navigate("/create")}
              fullWidth
            >
              Create a Meet
            </Button>
          </Box>
          <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
            OR
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <TextField
              placeholder="Enter Room Code..."
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={joinMeet} fullWidth>
              Join a Meet
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
