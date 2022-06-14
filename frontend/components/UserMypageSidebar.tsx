import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import Link from "next/link";
import { useRouter } from "next/router";
import { menuItemClasses, Typography } from "@mui/material";
import { bgcolor } from "@mui/system";

import Home from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import RateReviewIcon from "@mui/icons-material/RateReview";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import CoPresentIcon from "@mui/icons-material/CoPresent";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";

import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import AdfScannerOutlinedIcon from "@mui/icons-material/AdfScannerOutlined";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function UserMypageSidebar() {
  const pathName = useRouter().pathname;

  const data1 = [
    {
      icon:
        pathName === "/userpage/my/talent" ? (
          <CoPresentIcon />
        ) : (
          <CoPresentOutlinedIcon />
        ),
      label: "재능 기부",
      path: "/userpage/my/talent",
    },
    {
      icon:
        pathName === "/userpage/my/cs" ? (
          <LiveHelpIcon />
        ) : (
          <LiveHelpOutlinedIcon />
        ),
      label: "문의 내역",
      path: "/userpage/my/cs",
    },
  ];

  const data2 = [
    {
      icon:
        pathName === "/userpage/my/delivery" ? (
          <LocalShippingIcon />
        ) : (
          <LocalShippingOutlinedIcon />
        ),
      label: "기부 물품 배송 관리",
      path: "/userpage/my/delivery",
    },
  ];

  const data3 = [
    {
      icon:
        pathName === "/userpage/my/donation" ? (
          <VolunteerActivismIcon />
        ) : (
          <VolunteerActivismOutlinedIcon />
        ),
      label: "기부",
      path: "/userpage/my/donation",
    },
    {
      icon:
        pathName === "/userpage/my/volunteer" ? (
          <AssignmentIndIcon />
        ) : (
          <AssignmentIndOutlinedIcon />
        ),
      label: "봉사",
      path: "/userpage/my/volunteer",
    },
    {
      icon:
        pathName === "/userpage/my/certi" ? (
          <AdfScannerIcon />
        ) : (
          <AdfScannerOutlinedIcon />
        ),
      label: "증명서 발급",
      path: "/userpage/my/certi",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "#000000" },
            background: { paper: "#FCF8F0" },
          },
          typography: {
            // fontFamily: "Gowun Dodum",
            // fontFamily: "Noto Serif KR",
            fontFamily: "Noto Sans KR",
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 240 }}>
          <FireNav component="nav" disablePadding>
            {/* <Divider /> */}
            <Link href={"/userpage/my"}>
              <ListItem
                component="div"
                disablePadding
                // sx={{ backgroundColor: "#CDAD78" }}
                sx={{
                  bgcolor: pathName === "/userpage/my" ? "#CDAD78" : "#FCF8F0",
                  "&:hover, &:focus": {
                    "& svg": { opacity: 1 },
                    bgcolor: "#f5e1be",
                  },
                }}
              >
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemIcon>
                    {pathName === "/userpage/my" ? (
                      <Home color="primary" />
                    ) : (
                      <HomeOutlinedIcon color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary="마이페이지"
                    primaryTypographyProps={{
                      color: "primary",
                      fontWeight: "medium",
                      variant: "body2",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider />
            <Box
              sx={{
                bgcolor: "#FCF8F0",
                pb: 2,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: 0,
                  color: "#000000",
                  "&:hover, &:focus": {
                    "& svg": { opacity: 1 },
                    // bgcolor: "#F8DD8E",
                  },
                }}
              >
                <ListItemText
                  primary="내가 올린 글"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#000000",
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "rgba(0,0,0,0)",
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
              {data1.map((item) => (
                <Link href={item.path} key={item.path}>
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "#000000",
                      "&:hover, &:focus": {
                        "& svg": { opacity: 1 },
                        bgcolor: "#f5e1be",
                      },
                      bgcolor: pathName === item.path ? "#CDAD78" : "#FCF8F0",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                bgcolor: "#FCF8F0",
                pb: 2,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: 0,
                  color: "#000000",
                  "&:hover, &:focus": {
                    "& svg": { opacity: 1 },
                    // bgcolor: "#F8DD8E",
                  },
                }}
              >
                <ListItemText
                  primary="현황 조회"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#000000",
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "rgba(0,0,0,0)",
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
              {data2.map((item) => (
                <Link href={item.path} key={item.path}>
                  <ListItemButton
                    key={item.path}
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "#000000",
                      "&:hover, &:focus": {
                        "& svg": { opacity: 1 },
                        bgcolor: "#f5e1be",
                      },
                      bgcolor: pathName === item.path ? "#CDAD78" : "#FCF8F0",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                bgcolor: "#FCF8F0",
                pb: 2,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: 0,
                  color: "#000000",
                  "&:hover, &:focus": {
                    "& svg": { opacity: 1 },
                    // bgcolor: "#F8DD8E",
                  },
                }}
              >
                <ListItemText
                  primary="내역 조회"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    color: "#000000",
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "rgba(0,0,0,0)",
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
              {data3.map((item) => (
                <Link href={item.path} key={item.path}>
                  <ListItemButton
                    sx={{
                      py: 0,
                      minHeight: 32,
                      color: "#000000",
                      "&:hover, &:focus": {
                        "& svg": { opacity: 1 },
                        bgcolor: "#f5e1be",
                      },
                      bgcolor: pathName === item.path ? "#CDAD78" : "#FCF8F0",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
