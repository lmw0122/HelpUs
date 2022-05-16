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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import Link from "next/link";
import helpImage from "../../public/images/help.png";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

import defaultImage from "../../../public/images/defaultImage.png";
import CustomCarousel from "../../../components/Carousel";
import VolunteerDetailMap from "../../../components/VolunteerDetailMap";
import Comment from "../../../components/Comment";
import Pagination from "../../../components/Pagination";

// api
import {
  volunteerDetail,
  volunteerCommentList,
  volunteerComment,
  userDetail
} from "function/axios";
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



const VolunteerDetail: FC = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [volunteerDetails, setVolunteerDetails] = useState<any>(null);
  const [comment, setComment] = useState<string>("");
  const [parentCommentId, setParentComeentId] = useState("");
  const [commentList, setCommentList] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  let userId = 0;

  useEffect(() => {
    if (router.isReady) {
      volunteerDetail(router.query.id).then((res) => {
        console.log(res);
        setVolunteerDetails(res.data.volunteer);
        userId = res.data.volunteer.memberId;
        setLoading(true);
        console.log(volunteerDetails);
      }).then(() => {
        userDetail(userId).then((res) => {
          console.log(res);
          setUserDetails(res.data);
          setLoading2(true);
        })
      });
    }
  }, [router.isReady]);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    page: curPage,
  };

  useEffect(() => {
    if (router.isReady) {
      volunteerCommentList(router.query.id, params).then((res) => {
        setCommentList(res.data.comment);
        setTotalPages(res.data.totalPage);
        setLoading(true);
      });
    }
  }, [curPage, router.isReady]);

  

  // 댓글 버튼 누를 시 작성
  // const repoArray: any = [...commentList]
  const handleComment = (e) => {
    if (comment === "") {
      alert("댓글을 입력해주세요!");
      return;
    }
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const params = {
      volunteerId: router.query.id,
      content: comment,
      parentCommentId: "",
    };

    volunteerComment(id, token, params)
      .then((res) => {
        // setCommentList(commentList.concat(comment));
        console.log(res + "성공");
      })
      .catch((err) => console.log(err + "실패"));
  };

  return (
    <>
      {loading && loading2 ? (
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
                    {userDetails.profile === null ? (
                  <Image
                    src={defaultImage}
                    alt="orgImage"
                    width="300px"
                    height="300px"
                  />
                ) : (
                  <Image
                    src={userDetails.profile}
                    // src={defaultImage}
                    alt="orgImage"
                    width="300px"
                    height="300px"
                  />
                )}
                  </div>
                </Grid>
                <Grid>
                  <Typography sx={{ mt: 0.5 }} variant="h6" fontWeight="bold">
                    {userDetails?.name}
                  </Typography>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <BusinessIcon sx={{ mr: 2 }} />
                    <Typography align="center">
                      {userDetails?.address}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <CallIcon sx={{ mr: 2 }} />
                    <Typography align="center">{userDetails?.tel}</Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <MailIcon sx={{ mr: 2 }} />
                    <Typography align="center">{userDetails?.email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ mt: 1.5, mb: 3 }}
                alignItems="center"
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                  {volunteerDetails?.title}
                </Typography>
                <CustomButton
                  variant="contained"
                  size="small"
                  sx={{ width: 30 }}
                >
                  목록
                </CustomButton>
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
                  <CustomCarousel item={volunteerDetails?.images} />
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
                      {volunteerDetails?.content}
                      
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Typography variant="h6" fontWeight="bold" sx={{ ml: 5, mt: 2 }}>
                모집 인원수 : {volunteerDetails?.people}명
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ ml: 5, mt: 1 }}>
                장소 : 경기도 수원시 팔달구 중부대로 222번길 22 2-22
              </Typography>
              <Stack
                sx={{
                  width: 400,
                  mx: "auto",
                  mt: 3,
                }}
                direction="row"
              >
                <Stack
                  direction="column"
                  sx={{
                    width: `${volunteerDetails?.percent}%`,
                  }}
                >
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      height: 30,
                      bgcolor: "#CDAD78",
                    }}
                    justifyContent="center"
                    flexDirection="column"
                    display="flex"
                  >
                    <Typography sx={{ fontSize: 13 }} textAlign="center">
                      {volunteerDetails?.percent.toFixed()}%
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="column"
                  sx={{
                    width: `${100 - volunteerDetails?.percent}%`,
                  }}
                >
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      height: 30,
                      bgcolor: "#dbd5ca",
                    }}
                    justifyContent="center"
                    flexDirection="column"
                    display="flex"
                  >
                    <Typography sx={{ fontSize: 13 }} textAlign="center">
                      {(100 - volunteerDetails?.percent).toFixed()}%
                    </Typography>
                  </Box>
                </Stack>
                {/* <Stack>
              <Typography sx={{ width: 100, ml: 2 }}>3 / 9</Typography>
            </Stack> */}
              </Stack>
              <Stack sx={{ mt: 3 }}>
                <CustomButton sx={{ width: 100, mx: "auto" }}>
                  신청하기
                </CustomButton>
              </Stack>
              {/* 카카오 맵 */}
              <Stack sx={{ width: 800, height: 300, mt: 3, ml: 20 }}>
                <VolunteerDetailMap item={volunteerDetails} />
              </Stack>
              {/* <Box
                sx={{
                  width: 800,
                  height: 300,
                  bgcolor: "#ffffff",
                  mx: "auto",
                  mt: 3,
                }}
              >
                지도
              </Box> */}
              <Stack
                justifyContent="right"
                direction="row"
                sx={{ mt: 1.5, mb: 3 }}
                alignItems="center"
              >
                <Stack direction="row">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 3, mr: 2 }}
                  >
                    작성일
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 3 }}>
                    {volunteerDetails?.createDate.substr(0, 10)}
                  </Typography>
                </Stack>
              </Stack>
              <Divider color="#CDAD78" sx={{ my: 4, borderBottomWidth: 5 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ mx: 5 }}>
                댓글
              </Typography>
              <Box>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  sx={{ mt: 1.5, mb: 3, mx: 5 }}
                  alignItems="center"
                >
                  <TextField
                    sx={{ backgroundColor: "#ffffff", width: 980 }}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <CustomButton
                    variant="contained"
                    size="large"
                    sx={{ width: 80 }}
                    onClick={handleComment}
                  >
                    등록
                  </CustomButton>
                </Stack>
                {/* {commentList &&
                  commentList.map((item) => <Comment comment={item} />)} */}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <Pagination
                  paginate={paginate}
                  curPage={curPage}
                  totalPage={totalPages}
                />
              </Box>
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default VolunteerDetail;
