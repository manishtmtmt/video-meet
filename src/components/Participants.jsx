/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParticipants } from "@100mslive/react-sdk";
import { Participant } from "./Participant";

export const Participants = ({ setShowParticipants, peers }) => {
  const { participants } = useParticipants();
  return (
    <Box
      width={"25%"}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
        background: "#191b23",
        borderRadius: "10px",
      }}
      position={"absolute"}
      right={"2%"}
      p={3}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={"700"}>
          Participants
        </Typography>
        <Box
          component={"button"}
          borderRadius={"5px"}
          sx={{ cursor: "pointer" }}
          onClick={() => setShowParticipants(false)}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Divider sx={{ margin: "15px 0", borderBlockWidth: "2px" }} />
      <Box>
        {participants.length > 0
          ? participants.map((participant) => (
              <Participant key={participant.id} participant={participant} />
            ))
          : null}
      </Box>
    </Box>
  );
};
