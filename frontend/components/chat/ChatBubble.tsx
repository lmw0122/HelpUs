// 채팅방 목록의 1개 컴포넌트
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CssBaseline,
  IconButton,
  Stack,
} from "@mui/material";

import userDefaultImage from "../../public/images/userDefaultImage.png";

interface IChatBubble {
  chat: any;
  myId: any;
  oppUser: any;
}

const ChatBubble: FC<IChatBubble> = ({ chat, myId, oppUser }) => {

  if (Number(chat.sender) === Number(myId)) {
    return (
      <Stack style={{ margin: "0 20px 0 auto" }}>
        <Stack direction="row">
          <Typography style={{ margin: "auto 10px 0 0 " }}>
            {chat.date}
          </Typography>
          <Box
            sx={{
              bgcolor: "#CDAD78",
              maxHeight: "150px",
              maxWidth: "250px",
              borderRadius: 1.25,
            }}
          >
            <Typography sx={{ p: 2 }}>{chat.message}</Typography>
          </Box>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack style={{ margin: "0 auto 0 20px" }}>
        <Typography>{oppUser.name}</Typography>
        <Stack direction="row">
          <Box
            sx={{
              bgcolor: "#FCE2A6",
              maxHeight: "150px",
              maxWidth: "250px",
              borderRadius: 1.25,
            }}
          >
            <Typography sx={{ p: 2 }}>{chat.message}</Typography>
          </Box>
          <Typography style={{ margin: "auto 0 0 10px " }}>
            {chat.date}
          </Typography>
        </Stack>
      </Stack>
    );
  }
};

export default ChatBubble;
