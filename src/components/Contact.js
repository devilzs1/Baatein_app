import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from "phosphor-react";
import { faker } from "@faker-js/faker";
import AntiSwitch from "./AntSwitch";
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";


const Transition = React.forwardRef(function Transition(props,ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({open, handleClose})=>{

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Block this contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Block</Button>
      </DialogActions>
    </Dialog>
  );
}
const DeleteDialog = ({open, handleClose})=>{

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete the chat"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete the chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

const Contact = () => {
  const theme = useTheme();
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();

  const handleCloseBlock = ()=>{
    setOpenBlock(false);
  }
  const handleCloseDelete = ()=>{
    setOpenDelete(false);
  }

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
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => {}}>
              <X
                onClick={() => {
                  dispatch(ToggleSidebar());
                }}
              />
            </IconButton>
          </Stack>
        </Box>

        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={2}
          spacing={1.5}
        >
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.firstName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={500}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="body2" fontWeight={400}>
                {"+911234567890"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-evenly"
          >
            <Stack spacing={0.5} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Audio</Typography>
            </Stack>
            <Stack spacing={0.5} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Mentally disturbed</Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Media, Link & Docs</Typography>
            <Button
              endIcon={<CaretRight />}
              onClick={() => {
                dispatch(UpdateSidebarType("SHARED"));
              }}
            >
              786
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            {[1, 2, 3].map((el, index) => (
              <Box key={index}>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Star size={20} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Bell size={20} />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>
            <AntiSwitch />
          </Stack>

          <Divider />

          <Typography> 1 group in common</Typography>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} atl={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">Brain Dead</Typography>
              <Typography variant="caption">Love, Life, Money, You</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Button
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
              onClick={() => {
                setOpenBlock(true);
              }}
            >
              Block
            </Button>
            <Button
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
