import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, DotsThreeCircle, MagnifyingGlass, User} from "phosphor-react";
import React from "react";
import { useTheme} from "@mui/material/styles";
// import {ChatList} from "../../data";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import ChatElement from "../../components/ChatElements";
import Friends from "../../sections/dashboard/Friends";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { FetchDirectConversations } from "../../redux/slices/conversation";
// import {SimpleBarStyle} from "../../components/Scrollbar";

const user_id  = window.localStorage.getItem("user_id");
const Chats = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();
    const { conversations } = useSelector(
      (state) => state.conversation.direct_chat
    );

    useEffect(() => {
      socket.emit("get_direct_conversations", { user_id }, (data) => {
        console.log(data);

        dispatch(FetchDirectConversations({ conversations: data }));
      });
    }, []);

  const handleOpenDialog = ()=>{
    setOpenDialog(true);
  }
  const handleCloseDialog = ()=>{
    setOpenDialog(false);
  }
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 350,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={2} spacing={1} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <User />
              </IconButton>
              <IconButton>
                <DotsThreeCircle />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#676767" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            spacing={0.5}
            direction="column"
            sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
          >
            {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
            {conversations.map((el, index) => {
              return <ChatElement {...el} key={index} />;
            })}
            {/* </SimpleBarStyle> */}
          </Stack>
        </Stack>
      </Box>

      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
