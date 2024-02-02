/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useAVToggle } from "@100mslive/react-sdk";
import { Box } from "@mui/material";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

export const Footer = ({ width = "", height = "" }) => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
  useAVToggle();

  return (
    <>
      <Box
        component={"button"}
        sx={{ cursor: "pointer", width, height, display: "flex",
              justifyContent: "center",
              alignItems: "center", }}
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? <MicIcon /> : <MicOffIcon />}
      </Box>
      <Box
        component={"button"}
        sx={{ cursor: "pointer", width, height, display: "flex",
              justifyContent: "center",
              alignItems: "center", }}
        onClick={toggleVideo}
      >
        {isLocalVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
      </Box>
    </>
  );
};
