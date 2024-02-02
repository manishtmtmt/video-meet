/* eslint-disable react/prop-types, no-unused-vars */
import React from "react";
import {
  selectDominantSpeaker,
  selectVideoTrackByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import { Avatar, Box, Card, CardContent } from "@mui/material";

import userIcon from "../assets/user.png";

export const Peer = ({ peer, userName }) => {
  const trackSelector = selectVideoTrackByPeerID(peer.id);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  const track = useHMSStore(trackSelector);

  const videoEnabled = track?.enabled;

  return (
    <Box
      sx={{
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          border: dominantSpeaker?.id === peer.id ? "3px solid blue" : null,
        }}
      />
      {!videoEnabled ? (
        <Card
          sx={{
            borderRadius: "10px",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            border: dominantSpeaker?.id === peer.id ? "3px solid blue" : null,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Avatar src={userIcon} sx={{ width: "120px", height: "120px" }} />
          </CardContent>
        </Card>
      ) : null}
      <Box
        className="peer-name"
        p={1}
        sx={{
          position: "absolute",
          bottom: 5,
          right: 0,
          fontWeight: "700",
          background: "#1e1e1e",
          borderBottomRightRadius: "10px",
          borderTopLeftRadius: "10px",
        }}
      >
        {peer.name ? peer.name : userName} {peer.isLocal ? "(You)" : ""}
      </Box>
    </Box>
  );
};
