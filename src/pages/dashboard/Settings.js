import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import ShortcutsDialog from "../../sections/settings/ShortcutsDialog";
import ThemeDialog from "../../sections/settings/ThemeDialog";

const Settings = () => {
  const theme = useTheme();
  const [openTheme, setOpenTheme] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };
  const handleCloseTheme = () => {
    setOpenTheme(false);
  };

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };
  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onClick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onClick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onClick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onClick: handleOpenTheme,
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onClick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onClick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onClick: handleOpenShortcuts,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onClick: () => {},
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            overflowY: "scroll",
            height: "100vh",
            width: 350,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={5}>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h6"> Settings </Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Avatar
                sx={{ height: 56, width: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              {list.map(({ key, icon, title, onClick }) => (
                <>
                  <Stack
                    spacing={2}
                    sx={{ cursor: "pointer" }}
                    onClick={onClick}
                  >
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                    {key !== 7 && <Divider />}
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {openShortcuts && (
        <ShortcutsDialog
          open={handleOpenShortcuts}
          handleClose={handleCloseShortcuts}
        />
      )}
      {openTheme && (
        <ThemeDialog
          open={handleOpenTheme}
          handleClose={handleCloseTheme}
        />
      )}
    </>
  );
};

export default Settings;
