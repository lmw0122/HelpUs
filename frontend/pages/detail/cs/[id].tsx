import { FC, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  IconButton,
  Box,
  Container,
  Stack,
  Typography,
  CssBaseline,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  Table,
  Button,
  Divider,
  TextField,
  Tooltip,
  FormGroup,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import Link from "next/link";
import helpImage from "../../public/images/help.png";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import Comment from "../../../components/CommentCs";
import testImage from "../../../public/images/testImage.jpg";

import CustomCarousel from "@/components/Carousel";

import { useRouter } from "next/router";
// api
import { getCsDetail, csComment, userDetail } from "function/axios";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const CustomButton2 = styled(Button)({
  color: "#5B321E",
  border: "2px solid #5B321E",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FCE2A6",
    color: "#5B321E",
  },
});

const CustomButton3 = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  outline: "none",
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
  height: 62,
}));

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

const CsDetail: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [csDetails, setCsDetails] = useState<any>("");

  const [deleteStatus, setDeleteStatus] = useState<boolean>(false);

  const [detailLoading, setDetailLoading] = useState<boolean>(false);

  // 댓글
  const [comment, setComment] = useState<string>("");
  const [parentCommentId, setParentComeentId] = useState("");
  const [commentList, setCommentList] = useState<any>([]);

  const [id, setId] = useState<any>();
  const [token, setToken] = useState<any>();
  const [role, setRole] = useState<any>();

  const [writerInfo, setWriterInfo] = useState<any>("");
  const [writerLoading, setWriterLoading] = useState<boolean>(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    setRole(role);
    setId(id);
    setToken(token);
  });

  // 상세 페이지 정보 불러오기
  useEffect(() => {
    if (router.isReady) {
      getCsDetail(router.query.id, token).then((res) => {
        setCsDetails(res.data.desk);
        setCommentList(res.data.desk.comments);
        setLoading(true);
        setDetailLoading(true);
      });
    }
  }, [router.isReady, comment]);

  useEffect(() => {
    if (detailLoading) {
      userDetail(csDetails.memberId).then((res) => {
        setWriterInfo(res.data);
        setWriterLoading(true);
      });
    }
  }, [detailLoading]);

  const getDeleteStatus = (deleteStatus) => {
    setDeleteStatus(deleteStatus);
  };

  const handelComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요!");
      return;
    }
    const params = {
      helpDeskId: router.query.id,
      content: comment,
    };

    csComment(id, token, params)
      .then((res) => {
        // console.log("성공" + res)
        setComment("");
      })
      .catch((err) => console.log("실패" + err));
  };

  return (
    <>
      {loading && detailLoading && writerLoading ? (
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
          >
            <Container
              maxWidth="lg"
              sx={{
                mt: 4,
                mb: 4,
                bgcolor: "#FCF8F0",
                borderRadius: 1.25,
                // height: "350px",
              }}
            >
              <Grid container>
                <Grid sx={{ mr: 2 }}>
                  <div
                    style={{
                      borderRadius: "5px",
                      overflow: "hidden",
                      marginTop: "6px",
                    }}
                  >
                    {csDetails && csDetails.profile ? (
                      <Image
                        src={csDetails.profile}
                        alt="orgImage"
                        width="125px"
                        height="125px"
                      />
                    ) : (
                      <Image
                        src={testImage}
                        alt="orgImage"
                        width="125px"
                        height="125px"
                      />
                    )}
                  </div>
                </Grid>
                <Grid>
                  {writerInfo.role === "ORG" ? (
                    <Link href={`/orgpage/${csDetails.memberId}`}>
                      <Typography
                        sx={{ mt: 2.5, cursor: "pointer" }}
                        variant="h6"
                        fontWeight="bold"
                      >
                        {csDetails.name}
                      </Typography>
                    </Link>
                  ) : (
                    <Link href={`/userpage/${csDetails.memberId}`}>
                      <Typography
                        sx={{ mt: 2.5, cursor: "pointer" }}
                        variant="h6"
                        fontWeight="bold"
                      >
                        {csDetails.name}
                      </Typography>
                    </Link>
                  )}
                  {/* <Typography sx={{ mt: 2.5 }} variant="h6" fontWeight="bold">
                    {csDetails.name}
                  </Typography> */}
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <MailIcon sx={{ mr: 1 }} />
                    <Typography align="center">{csDetails.email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ mt: 1.5, mb: 3, ml: 7 }}
                alignItems="center"
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                  {csDetails.title}
                </Typography>
                <CustomButton
                  variant="contained"
                  size="small"
                  sx={{ width: 30 }}
                  onClick={() => history.back()}
                >
                  목록
                </CustomButton>
              </Stack>
              <Stack sx={{ ml: 8 }} direction="row">
                <Typography variant="h6" sx={{ mb: 3 }} fontWeight="bold">
                  카테고리 :
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, ml: 1 }}>
                  {csDetails.category}
                </Typography>
              </Stack>
              {/* 게시글 이미지 */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ mb: 3 }}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 0, mr: 5 }}
                >
                  <CustomCarousel item={csDetails?.images} />
                </Stack>
                <Stack>
                  <Box
                    sx={{
                      my: "auto",
                      bgcolor: "#f5e1be",
                      borderRadius: 1.25,
                      // height: "120px",
                    }}
                    height="470px"
                    width="500px"
                  >
                    <Typography sx={{ p: 2, mt: 0 }}>
                      {csDetails?.content}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Typography
                sx={{ mt: 2 }}
                variant="h6"
                fontWeight="bold"
                textAlign="right"
              >
                작성일 {Unix_timestamp(csDetails.createDate)}
              </Typography>

              {csDetails.updateDate === null ? null : (
                <Typography
                  sx={{ mt: 2 }}
                  variant="h6"
                  fontWeight="bold"
                  textAlign="right"
                >
                  수정일 {Unix_timestamp(csDetails.updateDate)}
                </Typography>
              )}

              <Divider color="#CDAD78" sx={{ my: 2, borderBottomWidth: 5 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ mx: 5 }}>
                댓글
              </Typography>
              {commentList < 1 && role === "ADMIN" ? (
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  sx={{ mt: 1.5, mb: 3, mx: 5 }}
                  alignItems="center"
                >
                  <CssTextField
                    sx={{ backgroundColor: "#ffffff", width: 1000 }}
                    size="small"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <CustomButton
                    variant="contained"
                    size="small"
                    sx={{ width: 30 }}
                    onClick={handelComment}
                  >
                    등록
                  </CustomButton>
                </Stack>
              ) : (
                <Box sx={{ height: 30 }}></Box>
              )}
              <Stack>
                {commentList &&
                  commentList.map((item, i) => (
                    <Comment
                      comment={item}
                      id={id}
                      token={token}
                      getDeleteStatus={getDeleteStatus}
                      deleteStatus={deleteStatus}
                      key={i}
                    />
                  ))}
              </Stack>
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default CsDetail;
