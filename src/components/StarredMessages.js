import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { CaretLeft, CaretRight, X } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { DocMsg, LinkMsg } from "./Conversation/MessageTypes";
import Message from "./Conversation/Message";

const StarredMessages = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: 350, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton onClick={() => {}}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>

        
        <Stack sx={{height: "100%", position: "relative", flexGrow : 1, overflowY: "scroll"}} p={2} spacing={2}>
          <Message/>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
