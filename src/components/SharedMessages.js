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
import { CaretLeft} from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { DocMsg, LinkMsg } from "./Conversation/MessageTypes";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";


const SharedMessages = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

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
            <IconButton onClick={() => {dispatch(UpdateSidebarType("CONTACT"))}}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>

        <Tabs
          sx={{ px: 2, pt: 2 }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="Docs" />
          <Tab label="Links" />
        </Tabs>

        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={2}
          spacing={value === 2 ? 1 : 2}
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5].map((el, index) => (
                      <Grid key={index} item xs={4}>
                        <img
                          src={faker.image.avatar()}
                          alt={faker.name.fullName()}
                        />
                      </Grid>
                ))}
                  </Grid>
                );
              case 1:
                return SHARED_LINKS.map((el, index) => (
                  <LinkMsg el={el} key={index} />
                ));
              case 2:
                return SHARED_DOCS.map((el, index) => (
                  <DocMsg el={el} key={index} />
                ));
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
