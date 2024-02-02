/* eslint-disable no-unused-vars */
import {
  useHMSActions,
  selectPeers,
  useHMSStore,
  selectIsConnectedToRoom,
  useHMSNotifications,
  selectDominantSpeaker,
  selectPeerCount,
} from "@100mslive/react-sdk";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ChatIcon from "@mui/icons-material/Chat";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import PeopleIcon from "@mui/icons-material/People";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { Peer } from "./Peer";
import { Footer } from "../components/Footer";
import { Chat } from "../components/Chat";
import { Participants } from "../components/Participants";

let interval;

export const Meet = () => {
  const navigate = useNavigate();
  const {
    state: { roomCode },
  } = useLocation();

  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  const peerCount = useHMSStore(selectPeerCount);
  const notification = useHMSNotifications();

  const [time, setTime] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);
  const [showParticipants, setShowParticipants] = React.useState(false);

  const leaveMeet = () => {
    if (isConnected) {
      hmsActions.leave();
      sessionStorage.removeItem("tokenResponse");
      navigate(-1);
    }
  };

  React.useEffect(() => {
    const date = moment().format("LLL");
    setTime(date);
    interval = setInterval(() => {
      const date = moment().format("LLL");
      setTime(date);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  React.useEffect(() => {
    if (!notification) {
      return;
    }
    console.log("notification type", notification.type);
    console.log("data", notification.data);
  }, [notification]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box>
          {dominantSpeaker && dominantSpeaker.name ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <VolumeUpIcon />
              <Typography>{dominantSpeaker.name}</Typography>
            </Box>
          ) : null}
        </Box>
        <Box>
          <Box
            display={"flex"}
            gap={1}
            border={"1px solid grey"}
            p={1}
            borderRadius={"5px"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
            onClick={() => setShowParticipants((prev) => !prev)}
          >
            <Box display={"flex"} alignItems={"center"}>
              <PeopleIcon />
            </Box>
            <Typography>{peerCount}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "95%", margin: "auto", flex: 1, display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {peers.length > 0
            ? peers.map((peer) => (
                <Box
                  key={peer.id}
                  sx={{
                    flex: "0.4 0 calc(33.33% - 20px)",
                    margin: "10px",
                    padding: "20px",
                  }}
                >
                  <Peer peer={peer} />
                </Box>
              ))
            : null}
        </Box>
        {openChat ? <Chat setOpenChat={setOpenChat} /> : null}
        {showParticipants ? (
          <Participants
            setShowParticipants={setShowParticipants}
            peers={peers}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flex: 1,
          }}
        >
          <Typography>{time}</Typography>
          <Typography sx={{ borderLeft: "1px solid" }}></Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>{roomCode}</Typography>
            <CopyToClipboard
              text={roomCode}
              style={{ cursor: "pointer" }}
              onCopy={() => setCopied(true)}
            >
              {copied ? <CheckIcon /> : <ContentCopyIcon />}
            </CopyToClipboard>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Footer width={"70px"} height={"35px"} />
          <Box
            component={"button"}
            sx={{
              cursor: "pointer",
              width: "70px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={leaveMeet}
          >
            <CallEndIcon color="error" />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            component={"button"}
            sx={{
              cursor: "pointer",
              width: "70px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setOpenChat((prev) => !prev)}
          >
            <ChatIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
