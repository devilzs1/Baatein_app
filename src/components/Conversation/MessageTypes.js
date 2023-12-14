import { Stack, Divider, Typography, Box, Link, IconButton } from "@mui/material";
import React from "react";
import { useTheme} from "@mui/material/styles";
import { DownloadSimple, Image } from "phosphor-react";

const Timeline = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="40%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="40%" />
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? (theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.paper)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};

const MediaMsg = ({el}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 200, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const DocMsg = ({el}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
            <Stack p={.5} direction="row" spacing={2} alignItems="center" sx={{backgroundColor: theme.palette.background.paper}}>
                <Image size={48}/>
                <Typography variant="caption"> Abstract.png</Typography>
                <IconButton>
                    <DownloadSimple/>
                </IconButton>
            </Stack>
            <Typography variant="body2" sx={{color: el.incoming ? theme.palette.text : "#fff"}}>{el.message}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const ReplyMsg = ({el}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            p={1.5}
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const LinkMsg = ({el}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction="column"
            p={1}
            spacing={1}
            alignItems="start"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 200, borderRadius: "10px" }}
            />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Creating Baatein app</Typography>
              <Typography
                variant="subtitle2"
                component={Link}
                sx={{ color: theme.palette.primary.main }}
                to="https://www.github.com/devilzs1/"
              >
                www.devilzs1.vercel.com/baatein-app
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text : "#fff"}
            >
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export { Timeline, TextMsg, MediaMsg, DocMsg, ReplyMsg, LinkMsg };
