import {
  getUserInfo,
  getChatroomList,
  getRoomId,
  createRoom,
  getChatCount,
  getChatLogs
} from "function/axios";
import { FC, useState, useEffect, useRef } from "react";
import { getNewsList } from "function/axios";
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
  TextField,
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
import userDefaultImage from "../../public/images/userDefaultImage.png";
import { useRouter } from "next/router";
// import "../../styles/scroll.css";

// 채팅 컴포넌트
import ChatRoomList from "@/components/chat/ChatRoomList";
import ChatBubble from "@/components/chat/ChatBubble";
// 채팅 외부 라이브러리
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5B321E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5B321E",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CDAD78",
    },
    "&:hover fieldset": {
      borderColor: "#5B321E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5B321E",
    },
  },
});

const Chatting: FC = () => {
  const router = useRouter();

  const [roomChange, setRoomChange] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({});
  const [oppUser, setOppUser] = useState<any>({});
  const [chatroomList, setChatroomList] = useState<any>(null);
  const [chatLogList, setChatLogList] = useState<any>(null);
  const [chatLoadingDone, setChatLoadingDone] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);
  const [roomId, setRoomId] = useState(0);
  const [memberId, setMemberId] = useState<any>("");
  const [token, setToken] = useState("");
  const [find, setFind] = useState<any>({});
  const [count, setCount] = useState(0);
  const [getLastMesssage, setGetLastMessage] = useState(false);
  //tcp 연결
  let sock = new SockJS("http://k6c106.p.ssafy.io:9082/stomp/chatting");
  let stomp = Stomp.over(sock);

  const getRoomChange = (roomChange) => {
    setRoomChange(roomChange);
  };

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
  const getLogs = () => {
    return chatLogList;
  };
  const startStomp = () => {
    console.log(roomId);
    if (roomId === 0) {
      return;
    }
    let prevChats = getLogs();
    stomp.connect({
      'Authorization': token
    }, function (frame) {
      //console.log(frame);
      console.log(roomId);
      console.log("Stomp conn!");
      stomp.subscribe("/sub/chatting/room/" + roomId, function (chat) {
        let content = JSON.parse(JSON.parse(JSON.stringify(chat)).body);
        prevChats = prevChats.concat(content);
        console.log(prevChats);
        setChatLogList(prevChats);
      }, {'Authorization': token});
    });
  };
  useEffect(() => {
    setMemberId(localStorage.getItem("id"));
    setToken(localStorage.getItem("token"));
    console.log("id : " + memberId + " token : " + token);
    if (router.isReady) {
      // 채팅방 목록 부르기
      getChatroomList(memberId).then((res) => {
        setChatroomList(res.data);
        setLoading(true);
      });
    }
  }, [router.isReady]);
  
  useEffect(() => {
    if (loading) {
      const oppMemberId = Number(router.query.id);
      if (oppMemberId !== 0) {
        // 상대방과 1:1 채팅 중
        getUserInfo(oppMemberId)
        .then((res) => {
          console.log(res);
          setOppUser(res.data);
        })
        .then(() => {
          getRoomId(oppMemberId, memberId).then((res) => {
            console.log(res);
            let tmpRoomId = res.data.chatroomId;
            if (res.status === 204) {
              //방을 새로 만들어야할 때
              createRoom(oppMemberId, memberId);
              setChatroomList(null);
              setLoading2(true);
            } else {
              console.log(res.data.chatroomId);
              setRoomId(res.data.chatroomId);
              setLoading3(true);
            }
            return tmpRoomId;
            
          }).then((data) => {
            startStomp();
            
          })
        });
        
      }

    }
  }, [loading])

  useEffect(() => {
    getChatCount(roomId).then((res) => {
      console.log(res.data);
      let tmpFind = res.data[0];
      if (tmpFind.lastMessageId === null) {
        tmpFind.lastMessageId = 0;
      }
      
      setFind((prevFind) => {
        return Object.assign({}, tmpFind);
      });
      return tmpFind;
      // 안되니?...... ㅜㅜㅜ
      // roomId 까지는 받아졌는데 그 다음인 find가 또 안받아져서 강제로 받아서 해볼라구
      // 그럼 useEffect 하나 더 만들까? ㅋㅋㅋㅋㅋ구
      //  근데 이 api 3~4개 세트를 써야하는 일이 많아서 애매하네
      // 저게 맨 위에거 하나 실행되면 아래 실행되는 세트 느낌이라 흠 
  }).then((tmpFind) => {
    console.log(tmpFind);
    console.log(roomId + " " + count);
      getChatLogs(roomId, tmpFind.lastMessageId, tmpFind.totalCount, count).then((res) => {
        if (res.status === 202) {
          setGetLastMessage(true);
        }
        console.log(res.data);
        setChatLogList(res.data);
        
        setCount(count + 1);
      });
    }) 

  }, [loading2, loading3])

  useEffect(() => {
    getChatroomList(memberId).then((res) => {
      setChatroomList(res.data);
    });
    const oppMemberId = Number(router.query.id);
    getRoomId(oppMemberId, memberId).then((res) => {
      console.log(res);
      if (res.status === 204) {
        //방을 새로 만들어야할 때
        createRoom(oppMemberId, memberId);
        setChatroomList(null);
      } else {
        console.log(res.data.chatroomId);
        setRoomId(res.data.chatroomId);
      }
      startStomp();
    });
    getChatCount(roomId).then((res) => {
      console.log(res.data);
      let tmpFind = res.data[0];
      if (tmpFind.lastMessageId === null) {
        tmpFind.lastMessageId = 0;
      }
      setFind((prevFind) => {
        return Object.assign({}, tmpFind);
      });
    }).then(() => {
      console.log(find);
      getChatLogs(roomId, find.lastMessageId, find.totalCount, count).then((res) => {
        if (res.status === 202) {
          setGetLastMessage(true);
        }
        console.log(res.data);
        setChatLogList(res.data);
        
        setCount(count + 1);
      });
    })
  }, [roomChange]);

  const scrollRef = useRef();

  // const router = useRouter();

  const messageBoxRef = useRef<HTMLUListElement>();
  
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  const scroll = (e) => {
    if (getLastMesssage)
      return;
    if (e.target.scrollTop == 0) {
      getChatLogs(roomId, find.lastMessageId, find.totalCount, count).then((res) => {
        if (res.status === 202) {
          setGetLastMessage(true);
        }
        console.log(res.data);
        setChatLogList(res.data.concat(chatLogList));
        setCount(count + 1);

      });
    }
      
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    console.log("useEffect 4 act");
  }, [find]);
  // 현재 보고 있는 유저의 memberId
  const [userId, setUserId] = useState<any>(null);

  const myId = 1000;

  // 채팅 인풋
  const [chatInput, setChatInput] = useState<any>("");

  const onChangeChatInput = useEffect(() => {
    if (router.isReady) {
      setUserId(router.query.id);
    }
  }, [router.isReady]);
  const sendMessage = () => {
    let msg = chatInput;
    let date = new Date();
    stomp.send('/pub/chatting/message', {'Authorization': token}, JSON.stringify({ chatroomId: roomId, date: date, message: msg, sender: memberId}));
    setChatInput('');
    getChatroomList(memberId).then((res) => {
      setChatroomList(res.data);
    });
  };

  const onKeyPress = (e) => {
    console.log(e);
      if (e.key == 'Enter') sendMessage(); 
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // height: "100vh",
            overflow: "auto",
            // mt: 10,
            mb: 20,
          }}
        >
          <Container maxWidth="lg">
            {roomId === 0 ? (
              <></>
            ): (
              <Typography
              sx={{ my: 5 }}
              textAlign="center"
              variant="h4"
              fontWeight="bold"
              >
            {oppUser.name}님과의 채팅방
              </Typography>    
            )}
            
            <Stack direction="row" spacing={20} justifyContent="center">
              <Stack>
                <Stack>
                  <Box
                    className="scroolBar"
                    // ref={scrollRef}
                    sx={{
                      bgcolor: "#FCF8F0",
                      height: "600px",
                      width: "400px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {/* 채팅방 목록 표시 부분 */}
                    <Stack>
                      {chatroomList &&
                        chatroomList.map((item, i) => (
                          <ChatRoomList chatList={item} key={i} roomChange={roomChange} getRoomChange={getRoomChange} />
                        ))}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
              <Stack>
                <Stack>
                  <Box
                    sx={{
                      bgcolor: "#FCF8F0",
                      height: "600px",
                      width: "600px",
                    }}
                  >
                    {/* /chatting/0 이라면 */}
                    {/* {userId == 0 ? (
                    <Typography
                      sx={{ mt: 10, ml: 20 }}
                      fontWeight="bold"
                      variant="h5"
                    >
                      대화 상대를 선택해주세요.
                    </Typography>
                  ) : (
                    <Typography>zz</Typography>
                  )} */}

                    {/* 말풍선 출력 부분 */}
                    <Stack
                      className="scroolBar"
                      ref={messageBoxRef}
                      sx={{ height: "520px", overflowY: "scroll" }}
                      // onScroll = {scroll}
                    >
                      {chatLogList &&
                        chatLogList.map((item, i) => (
                          <ChatBubble chat={item} key={i} myId={memberId} oppUser={oppUser}/>
                        ))}
                    </Stack>
                    {/* 입력창 */}
                    <Stack
                      justifyContent="center"
                      direction="row"
                      sx={{ mt: 1.5, mx: 5 }}
                      alignItems="center"
                      spacing={3}
                      onKeyPress={onKeyPress}
                    >
                      <CssTextField
                        sx={{ backgroundColor: "#ffffff", width: 400 }}
                        size="small"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                      />
                      <CustomButton
                        variant="contained"
                        size="small"
                        sx={{ width: 30, height: 35 }}
                        onClick={sendMessage}
                        // onClick={handleComment}
                      >
                        등록
                      </CustomButton>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Chatting;
