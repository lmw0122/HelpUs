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
  Link,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

// import Link from "next/link";
import helpImage from "../../public/images/help.png";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Comment from "../../../components/Comment3";
import Pagination from "../../../components/Pagination";

import defaultImage from "../../../public/images/defaultImage.png";
import CustomCarousel from "@/components/Carousel";

import { useRouter } from "next/router";
// api
import {
  reviewDetail,
  getSponsorList,
  getUserInfo,
  reviewCommentList,
  reviewComment,
  donationDetail,
} from "function/axios";

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

const ReviewDetail: FC = () => {
  const router = useRouter();

  const routerId = useRouter().query.id;

  const [reviewDetails, setReviewDetails] = useState<any>("");
  const [sponsorList, setSponsorList] = useState<any>("");
  const [orgInfo, setOrgInfo] = useState<any>("");
  const [orgId, setOrgId] = useState<any>("");

  const [donationInfo, setDonationInfo] = useState<any>("");
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>("");
  const [token, setToken] = useState<any>("");
  const [role, setRole] = useState<any>("");
  // 댓글
  const [comment, setComment] = useState<string>("");
  const [parentCommentId, setParentComeentId] = useState("");
  const [commentList, setCommentList] = useState<any>([]);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [curPage2, setCurPage2] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPages2, setTotalPages2] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const paginate2 = (pageNumber) => setCurPage2(pageNumber);

  const params = {
    page: curPage,
    donationId: 0,
  };
  // 상세 페이지 내용 불러오기
  useEffect(() => {
    setUserId(localStorage.getItem("id"));
    setToken(localStorage.getItem("jwt"));
    setRole(localStorage.getItem("role"));
    if (router.isReady) {
      reviewDetail(router.query.id).then((res) => {
        setReviewDetails(res.data.confirm);
        console.log(res.data);
        setDetailLoading(true);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (detailLoading) {
      params.donationId = reviewDetails.donationId;
      getSponsorList(reviewDetails.memberId, params).then((res) => {
        setSponsorList(res.data.apply);
        setTotalPages(res.data.totalPage);
        setLoading1(true);
      });
      donationDetail(reviewDetails.donationId).then((res) => {
        setDonationInfo(res.data.donation);
      });
    }
  }, [detailLoading]);

  useEffect(() => {
    if (detailLoading) {
      getUserInfo(reviewDetails.memberId).then((res) => {
        setOrgInfo(res.data);
        setLoading2(true);
      });
    }
  }, [detailLoading]);

  const params2 = {
    page: curPage2,
  };

  // 댓글
  useEffect(() => {
    if (router.isReady) {
      reviewCommentList(router.query.id, params2).then((res) => {
        setCommentList(res.data.comment);
        setTotalPages2(res.data.totalPage);
        setLoading3(true);
      });
    }
  }, [curPage, router.isReady, commentList]);

  const handleComment = (e) => {
    if (comment === "") {
      alert("댓글을 입력해주세요!");
      return;
    }
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    console.log(router.query.id);

    const params = {
      boardId: router.query.id,
      content: comment,
      category: "confirm",
    };

    reviewComment(id, token, params)
      .then((res) => {
        console.log(res + "성공");
        setComment("");
      })
      .catch((err) => console.log(err + "실패"));
  };

  return (
    <>
      {loading1 && loading2 && loading3? (
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
                    {orgInfo.profile === null ? (
                      <Image
                        src={defaultImage}
                        alt="orgImage"
                        width="150px"
                        height="150px"
                      />
                    ) : (
                      <Image
                        src={orgInfo.profile}
                        alt="orgImage"
                        width="150px"
                        height="150px"
                      />
                    )}
                  </div>
                </Grid>
                <Grid>
                  <Typography sx={{ mt: 0.5 }} variant="h6" fontWeight="bold">
                    {orgInfo ? orgInfo.name : null}
                  </Typography>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <BusinessIcon sx={{ mr: 2 }} />
                    <Typography align="center">
                      {orgInfo ? orgInfo.address : null}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <CallIcon sx={{ mr: 2 }} />
                    <Typography align="center">
                      {orgInfo ? orgInfo.tel : null}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <MailIcon sx={{ mr: 2 }} />
                    <Typography align="center">
                      {orgInfo ? orgInfo.email : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ mt: 1.5, mb: 3, ml: 8 }}
                alignItems="center"
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
                  {reviewDetails ? reviewDetails.title : null}
                </Typography>
                <Link href="/review">
                  <CustomButton
                    variant="contained"
                    size="small"
                    sx={{ width: 30 }}
                    onClick={() => history.back()}
                  >
                    목록
                  </CustomButton>
                </Link>
              </Stack>
              <Stack sx={{ ml: 8 }} direction="row">
                <Typography variant="h6" sx={{ mb: 3 }} fontWeight="bold">
                  기부 글 제목:
                </Typography>
                <Link
                  href={`/detail/donationorg/${reviewDetails.donationId}`}
                  underline="none"
                  color="inherit"
                >
                  <Typography variant="h6" sx={{ mb: 3, ml: 1 }}>
                    {donationInfo.title}
                  </Typography>
                </Link>
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
                  <CustomCarousel
                    item={reviewDetails ? reviewDetails.images : null}
                  />
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
                      {reviewDetails ? reviewDetails.content : null}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack
                justifyContent="space-between"
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
                    {reviewDetails ? reviewDetails.createDate : null}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ mt: 1.5, mb: 3 }}
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mt: 3, mr: 2 }}
                  >
                    후원자
                  </Typography>
                </Stack>
              </Stack>
              <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        후원자명
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        물품명
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        수량
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        기부일
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sponsorList &&
                      sponsorList.map((data, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="center">
                            {data.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.productName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.count}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.donationDate}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {sponsorList && sponsorList.length > 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 5,pb: 5 }}>
                <Pagination
                  paginate={paginate}
                  curPage={curPage}
                  totalPage={totalPages}
                />
              </Box>
                ): (
                  <></>
                )}
              <Divider color="#CDAD78" sx={{ my: 4, borderBottomWidth: 5 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ mx: 5 }}>
                댓글
              </Typography>
              {role === "USER" || role === "ORG" || role === "ADMIN" ? (
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
                  onClick={handleComment}
                >
                  등록
                </CustomButton>
                </Stack>
              ) : (
              <Box sx={{ height: 30 }}></Box>
            )}
              {commentList &&
                commentList.map((item, index) => (
                  <Comment
                    key={index}
                    comment={item}
                    id={userId}
                    token={token}
                  />
                ))}
              {commentList && commentList.length > 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 5, pb:5 }}>
                <Stack alignItems="center" sx={{ mb: 2, mt: 5 }}>
                    <Pagination
                      curPage={curPage2}
                      paginate={paginate2}
                      totalPage={totalPages2}
                    />
                    </Stack>
              </Box>
              ): (
                <></>
              )}
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ReviewDetail;
