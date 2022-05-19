import { FC, useState, useEffect } from "react";
import {
  getUserInfo,
  getChatroomList,
  getRoomId,
  createRoom
} from "function/axios";
import Pagination from "@/components/Pagination";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  Button,
  InputBase,
  Paper,
  Tabs,
  ThemeProvider,
  CssBaseline,
} from "@mui/material/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import volunteer1 from "../public/images/volunteer1.jpg";
import { useRouter } from "next/router";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CDAD78",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "#FCF8F0",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // height: 70,
  // rowStyle: { height: 50 },
  // maxHeight: ,
}));

const Chatting: FC = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({});
  const [oppUser, setOppUser] = useState({});
  const [chatroomList, setChatroomList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roomId, setRoomId] = useState(0);
  const [memberId, setMemberId] = useState<any>("");
  const [token, setToken] = useState("");
  
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: "#5B321E",
      },
    },
  });
  
  useEffect(() => {
    setMemberId(localStorage.getItem("id"));
    setToken(localStorage.getItem("token"));
    console.log("id : " + memberId + " token : " + token);
    if (router.isReady && Number(router.query.id) !== 0) {
      const oppMemberId = Number(router.query.id);
      getUserInfo(oppMemberId).then((res) => {
        console.log(res);
        setOppUser(res.data);
      }).then(() => {
        getRoomId(oppMemberId,memberId).then((res) => {
          console.log(res);
          if (res.status === 204) {
            //방을 새로 만들어야할 때
            createRoom(oppMemberId, memberId);
          }
          else {
            console.log(res.data.chatroomId);
            setRoomId(res.data.chatroomId);
            getChatroomList(memberId).then((res) => {
              console.log(res);
              setChatroomList(res.data);
            });
          }
        })
      })
    }
  }, [router.isReady]);
  const createMessageRoom = (chatroomId,oppUserId,oppNickname) => {
    setRoomId(chatroomId);
    setOppUser({ oppUserId: oppUserId, oppNickname: oppNickname });
    console.log(roomId);
  };
  // useEffect(() => {
  //   getNewsList(params).then((res) => {
  //     setChatroomList(res.data.news);
  //     // console.log("data는", reviewList);
  //     setLoading(true);
  //   });
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // height: "100vh",
          overflow: "auto",
          mt: 0,
        }}
      ></Box>
    </Box>
  );
};

export default Chatting;
