import { FC, useEffect, useState } from "react";
import Image from "next/image";
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
} from "@mui/material";

import { useRouter } from "next/router";

import { CommentData } from "../interfaces";
import defaultImage from "../public/images/userDefaultImage.png";
import ReplyIcon from "@mui/icons-material/Reply";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// api
import {donationOrgRecomment} from "../function/axios";
import { BookmarkAddOutlined } from "@mui/icons-material";

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

interface ICommentInput {
  inputStatus: boolean;
  comment: any;
}



const CommentInput: FC<ICommentInput> = ({ inputStatus, comment }) => {
  const router = useRouter();
  const [recomment, setRecomment] = useState<string>('');
  const [userId, setUserId] = useState<any>();
  const [userToken, setUserToken] = useState<any>();
  const [boardId, setBoardId] = useState<any>();
  const [parentId, setParentId] = useState<any>();
  const [status, setStatus] = useState<boolean>();


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
    const parentId = comment.commentId

    const params = {
      parentCommentId: parentId,
      boardId: boardId,
      content: recomment,
      category: "confirm",
    }

    donationOrgRecomment(userId, userToken, params)
      .then((res) => {
        console.log("성공" + res)
        setRecomment("")
      })
      .catch((err) => console.log("실패" + err))
  }

 
  return (
    <>
      {inputStatus === true ? (
        <>
          <CssTextField
            sx={{ backgroundColor: "#ffffff", width: 500 }}
            size="small"
            value={recomment}
            onChange={(e) => setRecomment(e.target.value)}
          />
          <CustomButton2 sx={{ ml: 2, height: 28 }} size="small" >
            취소
          </CustomButton2>
          <CustomButton 
            sx={{ ml: 2 }} 
            size="small"
            onClick={handleRecomment}
            >
            등록
          </CustomButton>
        </>
      ) : null}
    </>
  );
};

export default CommentInput;
