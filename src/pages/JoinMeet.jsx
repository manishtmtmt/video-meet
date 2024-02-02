/* eslint-disable no-unused-vars */
import React from "react";
import {
  selectLocalPeer,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { Peer } from "./Peer";
import { Footer } from "../components/Footer";

export const JoinMeet = () => {
  const navigate = useNavigate();
  const {
    state: { roomCode },
  } = useLocation();

  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);

  const [userName, setUserName] = React.useState("");
  const [isAudioMuted, setIsAudioMuted] = React.useState(true);
  const [isVideoMuted, setIsVideoMuted] = React.useState(false);
  const [authToken, setAuthToken] = React.useState();

  const inputRef = React.useRef(null);

  const preview = React.useCallback(async () => {
    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode,
      });

      await hmsActions.preview({
        userName: userName,
        authToken,
        settings: {
          isAudioMuted,
          isVideoMuted,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: false, // whether to measure network score in preview
      });

      setAuthToken(authToken);
    } catch (error) {
      console.log("ERROR while previewing", error);
      return;
    }
  }, [hmsActions, isAudioMuted, isVideoMuted, userName, roomCode]);

  const joinMeet = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      alert("User name is required.");
      return;
    }
    try {
      await hmsActions.join({
        userName,
        authToken,
        settings: {
          isAudioMuted,
          isVideoMuted,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true,
        captureNetworkQualityInPreview: false,
      });
      navigate(`/meet`, { state: { roomCode } });
    } catch (error) {
      console.log("ERROR while joining meet", error);
    }
  };

  React.useEffect(() => {
    if (roomCode) {
      preview();
    }
  }, [roomCode, preview]);

  React.useEffect(() => {
    return () => {
      hmsActions.cancelMidCallPreview();
    };
  }, [hmsActions]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width={"30%"} display={"flex"} flexDirection={"column"} gap={"20px"}>
        <Box>
          {localPeer ? (
            <Peer peer={localPeer} userName={userName} />
          ) : (
            <Skeleton
              variant="rectangular"
              width={550}
              height={300}
              sx={{ borderRadius: "10px" }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Footer width="35px" height="30px" />
        </Box>
        <Box component={"form"} onSubmit={joinMeet}>
          <TextField
            ref={inputRef}
            autoFocus
            fullWidth
            placeholder="Enter your name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            type="button"
            onClick={joinMeet}
          >
            Join Meet
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
