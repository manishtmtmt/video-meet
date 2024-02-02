/* eslint-disable no-unused-vars */
import React from "react";
import {
  selectLocalPeer,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Skeleton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  createRoom,
  retrieveRoomCode,
} from "../redux/slice/roomSlice";
import { Peer } from "./Peer";
import { Footer } from "../components/Footer";

export const CreateMeet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const [userName, setUserName] = React.useState("");
  const [isAudioMuted, setIsAudioMuted] = React.useState(true);
  const [isVideoMuted, setIsVideoMuted] = React.useState(false);
  const [authToken, setAuthToken] = React.useState();
  const inputRef = React.useRef(null);
  const { createRoomResponse, retrieveRoomCodeResponse } =
    useSelector((state) => state.roomReducer);

  const preview = React.useCallback(async () => {
    try {
      const hostRoomCode = retrieveRoomCodeResponse.data.filter((data) => {
        if (data.role === "host") return data;
      })[0]["code"];

      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: hostRoomCode,
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
  }, [
    hmsActions,
    isAudioMuted,
    isVideoMuted,
    userName,
    retrieveRoomCodeResponse,
  ]);

  const createMeet = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      alert("User name is required!");
      return;
    }

    try {
      await hmsActions.join({
        userName,
        authToken: authToken,
        settings: {
          isAudioMuted,
          isVideoMuted,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true,
        captureNetworkQualityInPreview: false,
      });

      const guestRoomCode = retrieveRoomCodeResponse.data.filter((data) => {
        if (data.role === "guest") return data;
      })[0]["code"];

      navigate(`/meet`, { state: { roomCode: guestRoomCode } });
    } catch (error) {
      console.log("ERROR while joining meet", error);
    }
  };

  // React.useEffect(() => {
  //   dispatch(createRoom());
  // }, [dispatch]);

  React.useEffect(() => {
    if (retrieveRoomCodeResponse && retrieveRoomCodeResponse.data) {
      preview();
    }
  }, [retrieveRoomCodeResponse, retrieveRoomCodeResponse?.data, preview]);

  React.useEffect(() => {
    dispatch(retrieveRoomCode("65b9e82ffe17f24bd346c05a"));
  }, [dispatch]);

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
        <Box component={"form"} onSubmit={createMeet}>
          <TextField
            ref={inputRef}
            autoFocus
            fullWidth
            placeholder="Enter your name..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            type="button"
            onClick={createMeet}
            fullWidth
            variant="contained"
          >
            Create Meet
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
