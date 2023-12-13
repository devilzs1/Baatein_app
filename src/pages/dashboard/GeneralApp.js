import React from "react";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import { Box, Stack } from "@mui/material";
import {useTheme} from "@mui/material/styles";

const GeneralApp = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" sx={{width:"100%"}}>
      <Chats />

      <Box sx={{height: "100%", width:"calc(100vw - 400px)", backgroundColor: theme.palette.mode==="light" ? "#fff" : theme.palette.background.default}}>
      <Conversation/>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
