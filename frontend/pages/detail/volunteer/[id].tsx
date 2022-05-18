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
  alertClasses,
  Modal,
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
  userDetail,
  volunteerApply,
  volunteerApplyCheck,
} from "function/axios";
import { useRouter } from "next/router";
import { setDefaultResultOrder } from "dns";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

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

  const [loading3, setLoading3] = useState<boolean>(false);
  const [id, setId] = useState<any>();
  const [token, setToken] = useState<any>();
  const [role, setRole] = useState<any>();
  const [checkApply, setCheckApply] = useState<any>(-1);
  let userId = 0;
  let applyPart;

  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 상세 페이지 내용 불러오기
  useEffect(() => {
    if (router.isReady) {
      // console.log("id" + router.query.id);
      volunteerDetail(router.query.id)
        .then((res) => {
          // console.log(res);
          setVolunteerDetails(res.data.volunteer);
          userId = res.data.volunteer.memberId;
          setLoading(true);
          // console.log(volunteerDetails);
        })
        .then(() => {
          userDetail(userId).then((res) => {
            // console.log(res);
            setUserDetails(res.data);
            setLoading2(true);
          });
        })
        .then(() => {
          let tmpToken = localStorage.getItem("jwt");
          let tmpRole = localStorage.getItem("role");
          if (tmpRole === "USER") {
            volunteerApplyCheck(router.query.id, tmpToken).then((res) => {
              setCheckApply(res.data.applyStatus.status);
            });
          }
          setLoading3(true);
        });
    }
  }, [router.isReady, open]);

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
        // console.log(res);
        setTotalPages(res.data.totalPage);
        setLoading(true);
      });
    }
  }, [curPage, router.isReady, commentList, open]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    setRole(role);
    setId(id);
    setToken(token);
  });

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
        // console.log(res + "성공");
        setComment("");
      })
      .catch((err) => console.log(err + "실패"));
  };
  const SetApplyPart = ({ role, status }) => {
    if (role === "USER" && status === -1) {
      return (
        <>
          <CustomButton sx={{ width: 100, mx: "auto" }} onClick={handleOpen}>
            신청하기
          </CustomButton>
        </>
      );
    } else if (role === "USER") {
      return (
        <>
          <Typography
            variant="h5"
            sx={{ mt: 0, display: "flex", justifyContent: "center" }}
            color="#5B321E"
            fontWeight="bold"
          >
            신청 완료
          </Typography>
        </>
      );
    } else {
      return <></>;
    }
  };
  // 봉사 신청
  const Apply = (e) => {
    const token = localStorage.getItem("jwt");
    const id = router.query.id;

    volunteerApply(id, token)
      .then((res) => {
        // console.log(res + "성공");
        setOpen(false);
        // window.location.reload();
      })
      .catch((err) => console.log(err + "실패"));
  };

  const volDate = "" + volunteerDetails?.volDate;

  return (
    <>
      {loading && loading2 && loading3 ? (
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
                        width="150px"
                        height="150px"
                      />
                    ) : (
                      <Image
                        src={userDetails.profile}
                        // src={defaultImage}
                        alt="orgImage"
                        width="150px"
                        height="150px"
                      />
                    )}
                  </div>
                </Grid>
                <Grid>
                  <Typography sx={{ mt: 0.5 }} variant="h6" fontWeight="bold">
                    <Link
                      href={`/orgpage/${userDetails?.memberId}`}
                      style={{ cursor: "pointer" }}
                    >
                      {userDetails?.name}
                    </Link>
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
                  onClick={() => history.back()}
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
                장소 : {volunteerDetails?.volAddress}
              </Typography>
              <Stack
                sx={{
                  width: 400,
                  mx: "auto",
                  mt: 3,
                }}
                direction="row"
              >
                {volunteerDetails?.percent === 0 ? null : (
                  <Stack
                    direction="column"
                    sx={{
                      width: `${volunteerDetails?.percent}%`,
                    }}
                  >
                    {volunteerDetails?.percent === 100 ? (
                      <Box
                        sx={{
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
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
                    ) : (
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
                    )}
                  </Stack>
                )}
                {100 - volunteerDetails?.percent === 0 ? null : (
                  <Stack
                    direction="column"
                    sx={{
                      width: `${100 - volunteerDetails?.percent}%`,
                    }}
                  >
                    {100 - volunteerDetails?.percent === 100 ? (
                      <Box
                        sx={{
                          borderTopRightRadius: 5,
                          borderBottomRightRadius: 5,
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
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
                    ) : (
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
                    )}
                  </Stack>
                )}
              </Stack>
              <Stack sx={{ mt: 1 }}>
                <Typography textAlign="center" fontWeight="bold">
                  {volunteerDetails?.applicant} / {volunteerDetails?.people}
                </Typography>
              </Stack>
              <Stack sx={{ mt: 3 }}>
                <SetApplyPart role={role} status={checkApply} />
              </Stack>
              {/* 카카오 맵 */}
              <Stack sx={{ width: 800, height: 300, mt: 3, ml: 20 }}>
                <VolunteerDetailMap item={volunteerDetails} />
              </Stack>
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
              {role === "USER" || role === "ORG" || role === "ADMIN" ? (
                <Box>
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  sx={{ mt: 1.5, mb: 3, mx: 5 }}
                  alignItems="center"
                >
                  <TextField
                    sx={{ backgroundColor: "#ffffff", width: 980 }}
                    value={comment}
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
                {commentList &&
                  commentList.map((item) => (
                    <Comment comment={item} id={id} token={token} />
                  ))}
              </Box>
              ): (
                <></>
              )}
              {commentList && commentList.length > 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                <Pagination
                  paginate={paginate}
                  curPage={curPage}
                  totalPage={totalPages}
                />
              </Box>
              ): (
                <></>
              )}
              
              <Stack justifyContent="center">
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Stack justifyContent="center" alignItems="center">
                      <Typography textAlign="center" sx={{ mb: 1 }}>
                        봉사 일자 : {volDate.substring(0, 10)}
                      </Typography>
                      <Typography textAlign="center" sx={{ mb: 1 }}>
                        봉사 장소 : {volunteerDetails?.volAddress}
                      </Typography>
                      <Typography textAlign="center" sx={{ mb: 1 }}>
                        봉사를 신청하시겠습니까?
                      </Typography>
                      <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                        <CustomButton2 onClick={handleClose}>
                          취소
                        </CustomButton2>
                        <CustomButton onClick={Apply}>확인</CustomButton>
                      </Stack>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default VolunteerDetail;
