import React from "react";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import StarredMessages from "../../components/StarredMessages";
import SharedMessages from "../../components/SharedMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />

      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 780px)" : "calc(100vw - 430px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        <Conversation />
      </Box>

      { sidebar.open && (()=>{
        switch(sidebar.type){
          case "CONTACT":
            return <Contact/>
          case "STARRED":
            return <StarredMessages/>
          case "SHARED":
            return <SharedMessages/>
          default:
            break;
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;
