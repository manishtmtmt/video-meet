/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  selectAudioTrackByPeerID,
  selectVideoTrackByPeerID,
  useHMSStore,
} from "@100mslive/react-sdk";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { capitalizeFirstLetter, stringAvatar } from "../utils";

export const Participant = ({ participant }) => {
  const videoTrackSelector = selectVideoTrackByPeerID(participant.id);
  const audioTrackSelector = selectAudioTrackByPeerID(participant.id);

  const videoTrack = useHMSStore(videoTrackSelector);
  const audioTrack = useHMSStore(audioTrackSelector);

  const videoEnabled = videoTrack?.enabled;
  const audioEnabled = audioTrack?.enabled;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      mt={2}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box>
          <Avatar {...stringAvatar(participant.name)} />
        </Box>
        <Box>
          <Typography lineHeight={1} fontSize={"18px"}>
            {participant.name}
          </Typography>
          <Typography fontSize={"16px"}>
            {capitalizeFirstLetter(participant.roleName)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>{audioEnabled ? <MicIcon /> : <MicOffIcon />}</Box>
        <Box>{videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}</Box>
      </Box>
    </Box>
  );
};
