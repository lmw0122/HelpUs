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
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  TextField,
  Table,
  Modal,
} from "@mui/material";

import { CommentData } from "../interfaces";
import defaultImage from "../public/images/userDefaultImage.png";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
// import CommentInput from "./CommentInput3";

// api
import {volunteerCommentDelete, volunteerCommentList, talentRecomment} from "function/axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e9e1d3",
  // border: "2px solid #000",
  borderRadius: 2,
  // boxShadow: 24,
  p: 2,
};

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

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
  fontSize: 12,
});

const CustomButton2 = styled(Button)({
  color: "#5B321E",
  border: "2px solid #5B321E",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FCE2A6",
    color: "#5B321E",
  },
  fontSize: 12,
});

const Comment: FC<CommentData> = ({ comment, id, token }) => {
  const [inputStatus, setInputStatus] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>();
  const [parentId, setParentId] = useState<any>();
  const router = useRouter();

  const [recomment, setRecomment] = useState<string>('');
  const [userToken, setUserToken] = useState<any>();
  const [boardId, setBoardId] = useState<any>();


  const onClickInputStatus = () => {
    setInputStatus(!inputStatus);
  };

  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //댓글 삭제
  const removeComment = () => {
    const commentId = comment.commentId
      // console.log(commentId)
      // console.log(userId)
      // setOpen(true)
      volunteerCommentDelete(commentId, id, token)
        .then((res) => {
          console.log("성공" + res );
          setOpen(false);
        })
        .catch((err) => console.log("실패" + err))

      if (userId != comment.memberId) {
        alert("댓글 작성자가 아닙니다.");
        return;
      }
  }

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    setUserId(id);
    setUserToken(token);
    if (router.isReady) {
      setBoardId(router.query.id)
    }
  }, [router.isReady])

  // 대댓글 작성
  const handleRecomment = () => {
    if (recomment == "") {
      alert("댓글을 입력해주세요!");
      return;
    }
    const parentId = comment.commentId

    const params = {
      parentCommentId: parentId,
      volunteerId: boardId,
      content: recomment,
    }

    talentRecomment(userId, userToken, params)
      .then((res) => {
        console.log("성공" + res)
        setInputStatus(false)
        setRecomment("")
      })
      .catch((err) => console.log("실패" + err))
  }

  const cancle = () => {
    setInputStatus(!inputStatus)
  }

  const Unix_timestamp = (t) => {
    var date = new Date(t);
    date.setHours(date.getHours() + 9);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    return (
      year +
      "-" +
      month.substr(-2) +
      "-" +
      day.substr(-2) +
      " " +
      hour.substr(-2) +
      ":" +
      minute.substr(-2)
    );
  };
  
  
  return (
    <>
      <>
        {comment.parentId === null ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ ml: 5, my: 1.5 }}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Image
                  src={defaultImage}
                  alt="프로필 이미지"
                  width="40px"
                  height="40px"
                />
                <Link href={`/userpage/${comment.memberId}`} >
                  <Typography sx={{ fontSize: 18, ml: 1, cursor: 'pointer' }} fontWeight="bold">
                    {comment.name}
                  </Typography>
                </Link>
                <Typography sx={{ ml: 1 }}>{comment.content}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Button
                  onClick={onClickInputStatus}
                  sx={{ color: "#807c7c", fontSize: 12 }}
                >
                  답글쓰기
                </Button>
                {comment ? (
                  <Typography>
                      {Unix_timestamp(comment.createDate)}
                  </Typography>
                ) : (null)}
                {/* id랑  memberId랑 같으면 삭제 버튼 활성화*/}
                {userId == comment.memberId ? (
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ width: 10, mr: 5, ml: 2 }}
                  
                  >
                    삭제
                  </Button>
                ) : null}
              </Stack>
            </Stack>
            {inputStatus === true ? (
              <Stack direction="row" sx={{ ml: 11, mb: 2 }} alignItems="center">
                <CssTextField
                  sx={{ backgroundColor: "#ffffff", width: 500 }}
                  size="small"
                  value={recomment}
                  onChange={(e) => setRecomment(e.target.value)}
                />
                <CustomButton2 sx={{ ml: 2, height: 28 }} size="small" onClick={cancle}>
                  취소
                </CustomButton2>
                <CustomButton 
                  sx={{ ml: 2 }} 
                  size="small"
                  onClick={handleRecomment}
                  >
                  등록
                </CustomButton>
              </Stack>
            ) : null}
            {/* <Stack direction="row" sx={{ ml: 11, mb: 2 }} alignItems="center">
              <CommentInput inputStatus={inputStatus} comment={comment} />
            </Stack> */}
            <Stack justifyContent="center">
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Stack justifyContent="center" alignItems="center">
                      <Typography textAlign="center" sx={{ mb: 1, fontWeight: 'bold' }}>
                        이 댓글을 삭제하시겠습니까?
                      </Typography>
                      <Typography textAlign="center" sx={{ mb: 1 }}>
                        [이 댓글에 달린 대댓글도 모두 삭제됩니다]
                      </Typography>
                      <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                        <CustomButton2 onClick={handleClose}>
                          취소
                        </CustomButton2>
                        <CustomButton onClick={removeComment}>확인</CustomButton>
                      </Stack>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
          </>
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ ml: 10, my: 1.5 }}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Image
                  src={defaultImage}
                  alt="프로필 이미지"
                  width="40px"
                  height="40px"
                />
                <Link href={`/userpage/${comment.memberId}`} >
                  <Typography sx={{ fontSize: 18, ml: 1, cursor: 'pointer' }} fontWeight="bold">
                    {comment.name}
                  </Typography>
                </Link>
                <Typography
                  sx={{ ml: 1, color: "#3470ca", fontSize: 14 }}
                  fontWeight="bold"
                >
                  {comment.parentName}
                </Typography>
                <Typography sx={{ ml: 1 }}>{comment.content}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Button
                  onClick={onClickInputStatus}
                  sx={{ color: "#807c7c", fontSize: 12 }}
                >
                  답글쓰기
                </Button>
                {comment ? (
                  <Typography>{Unix_timestamp(comment.createDate)}</Typography>
                ) : (null)}
                {userId == comment.memberId ?(
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ width: 10, mr: 5, ml: 2 }}
                    onClick={handleOpen}
                  >
                    삭제
                  </Button>
                ) : null}
              </Stack>
            </Stack>
            {inputStatus === true ? (
              <Stack direction="row" sx={{ ml: 11, mb: 2 }} alignItems="center">
                <CssTextField
                  sx={{ backgroundColor: "#ffffff", width: 500 }}
                  size="small"
                  value={recomment}
                  onChange={(e) => setRecomment(e.target.value)}
                />
                <CustomButton2 sx={{ ml: 2, height: 28 }} size="small" onClick={cancle}>
                  취소
                </CustomButton2>
                <CustomButton 
                  sx={{ ml: 2 }} 
                  size="small"
                  onClick={handleRecomment}
                  >
                  등록
                </CustomButton>
              </Stack>
            ) : null}
            {/* <Stack direction="row" sx={{ ml: 16, mb: 2 }} alignItems="center">
              <CommentInput inputStatus={inputStatus} comment={comment} />
            </Stack> */}
            <Stack justifyContent="center">
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Stack justifyContent="center" alignItems="center">
                      <Typography textAlign="center" sx={{ mb: 1, fontWeight: 'bold' }}>
                        이 댓글을 삭제하시겠습니까?
                      </Typography>
                      <Typography textAlign="center" sx={{ mb: 1 }}>
                        [이 댓글에 달린 대댓글도 모두 삭제됩니다]
                      </Typography>
                      <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                        <CustomButton2 onClick={handleClose}>
                          취소
                        </CustomButton2>
                        <CustomButton onClick={removeComment}>확인</CustomButton>
                      </Stack>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
          </>
        )}
      </>
      {/* <Stack
        direction="row"
        alignItems="center"
        sx={{ ml: 5, mb: 1 }}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center">
          <Image
            src={defaultImage}
            alt="프로필 이미지"
            width="40px"
            height="40px"
          />
          <Typography sx={{ fontSize: 18, ml: 1 }} fontWeight="bold">
            {comment.name}
          </Typography>
          <Typography sx={{ ml: 1 }}>{comment.content}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button>
            <KeyboardArrowDownIcon sx={{ color: "#000000" }} />
          </Button>
          <Typography>{comment.createDate.substr(0, 10)}</Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ width: 10, mr: 5, ml: 2 }}
          >
            삭제
          </Button>
        </Stack>
      </Stack> */}
    </>
  );
};

export default Comment;
