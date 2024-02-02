/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloseIcon from "@mui/icons-material/Close";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  selectHMSMessages,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import moment from "moment";

export const Chat = ({ setOpenChat }) => {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef(null);
  const messagesEndRef = React.useRef(null);

  const hmsActions = useHMSActions();
  const messages = useHMSStore(selectHMSMessages);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setMessage("");
      return;
    }

    hmsActions.sendBroadcastMessage(message);
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <Box
      width={"30%"}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        height: "80vh",
        boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
        background: "#191b23",
        borderRadius: "10px",
      }}
      p={3}
      data-aos="fade-right"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h5" fontWeight={"700"}>
            Chat
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid",
              borderRadius: 2,
            }}
            p={1}
          >
            <PeopleAltIcon />
            <Typography>Everyone</Typography>
          </Box>
        </Box>
        <Box
          component={"button"}
          borderRadius={"5px"}
          sx={{ cursor: "pointer" }}
          onClick={() => setOpenChat(false)}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Box sx={{ height: "100%", overflow: "auto" }} my={2}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Box key={message.id} my={2}>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography fontSize={18}>{message.senderName}</Typography>
                <Typography fontSize={14} fontWeight={"300"}>
                  {moment(message.time).format("LT")}
                </Typography>
              </Box>
              <Typography fontSize={18} lineHeight={1.5}>
                {message.message}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            There are no messages here
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box>
        <Paper
          component="form"
          sx={{ width: "inherit", display: "flex", padding: 1 }}
          onSubmit={sendMessage}
        >
          <InputBase
            ref={inputRef}
            autoFocus
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write something here"
            inputProps={{ "aria-label": "chat" }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <IconButton type="button" sx={{ p: "10px" }} onClick={sendMessage} aria-label="chat">
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};
