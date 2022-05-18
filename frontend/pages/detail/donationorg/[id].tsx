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

import testImage from "../../../public/images/testImage.jpg";
import Comment from "../../../components/Comment2";
import Pagination from "../../../components/Pagination";
import ExpiryDate from "../../../components/ExpiryDate";

import CustomCarousel from "@/components/Carousel";
import DonationApply from "@/components/DonationApply";

import { useRouter } from "next/router";
// api
import {
  donationDetail,
  getUserInfo,
  donationOrgCommentList,
  donationOrgComment,
  finishDonation,
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
  backgroundColor: "#CDAD78",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#5B321E",
    color: "white",
  },
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  outline: "none",
  margin: 10,
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

const DonationOrgDetail: FC = () => {
  const router = useRouter();
  const routerId = useRouter().query.id;

  const [donationDetails, setDonationDetails] = useState<any>("");
  const [orgInfo, setOrgInfo] = useState<any>("");
  const [orgId, setOrgId] = useState<any>("");
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [userId, setUserId] = useState<any>("");
  const [token, setToken] = useState<any>("");
  const [role, setRole] = useState<any>("");
  const [donationId, setDonationId] = useState<any>("");
  const [applyStatus, setApplyStatus] = useState<boolean>(false);

  // 댓글
  const [comment, setComment] = useState<string>("");
  const [recomment, setRecomment] = useState<string>("");
  const [commentList, setCommentList] = useState<any>([]);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params2 = {
    page: curPage,
  };

  const getStatus = (applyStatus) => {
    setApplyStatus(applyStatus);
  };

  // 기관 정보 불러오기
  useEffect(() => {
    setUserId(localStorage.getItem("id"));
    setToken(localStorage.getItem("jwt"));
    setRole(localStorage.getItem("role"));

    if (router.isReady) {
      setDonationId(router.query.id);
      donationDetail(router.query.id).then((res) => {
        // console.log(res);
        setDonationDetails(res.data.donation);
        console.log(res.data.donation);
        setDetailLoading(true);
      });
    }
  }, [router.isReady, applyStatus]);

  useEffect(() => {
    if (detailLoading) {
      // console.log(donationDetails);
      getUserInfo(donationDetails.memberId).then((res) => {
        setOrgInfo(res.data);
      });
      // console.log(donationDetails);
    }
  }, [detailLoading]);

  // 댓글
  useEffect(() => {
    if (router.isReady) {
      donationOrgCommentList(router.query.id, params2).then((res) => {
        setCommentList(res.data.comment);
        // console.log(res);
        setTotalPages(res.data.totalPage);
        setLoading(true);
      });
    }
  }, [curPage, router.isReady, commentList]);

  const handleComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요!");
      return;
    }
    const params = {
      boardId: router.query.id,
      content: comment,
      category: "donation",
    };

    donationOrgComment(userId, token, params)
      .then((res) => {
        console.log(res + "성공");
        setComment("");
      })
      .catch((err) => console.log(err + "실패"));
  };

  // 마감하기
  const handleFinish = (e) => {
    e.preventDefault();
    const memberId = donationDetails.memberId;

    finishDonation(donationId, memberId, token)
      .then((res) => console.log("성공" + res))
      .catch((err) => console.log("실패" + err));
  };

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
              {
                orgInfo ?
                (
                  orgInfo.profile ?
                  (
                    <Image
                      src={orgInfo.profile}
                      alt="orgImage"
                      width="150px"
                      height="150px"
                    />
                  ) :
                  (
                    <Image
                      src={testImage}
                      alt="orgImage"
                      width="150px"
                      height="150px"
                    />
                  )
                ) : null
              }
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
            sx={{ mt: 1.5, mb: 3 }}
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
              {donationDetails ? donationDetails.title : null}
            </Typography>
            <Box>
              {userId == donationDetails.memberId ? (
                <CustomButton3
                  variant="contained"
                  size="small"
                  sx={{ width: 30 }}
                  onClick={handleFinish}
                >
                  마감
                </CustomButton3>
              ) : null}
              <Link href="/donation">
                <CustomButton
                  variant="contained"
                  size="small"
                  sx={{ width: 30 }}
                  onClick={() => history.back()}
                >
                  목록
                </CustomButton>
              </Link>
            </Box>
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
                item={donationDetails ? donationDetails.images : null}
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
                  {donationDetails ? donationDetails.content : null}
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
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mr: 2 }}>
                종료일
              </Typography>
              <Typography variant="h6" sx={{ mt: 3 }}>
                {donationDetails ? donationDetails.endDate : null}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mr: 2 }}>
                작성일
              </Typography>
              <Typography variant="h6" sx={{ mt: 3 }}>
                {donationDetails ? donationDetails.createDate : null}
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
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 3, mr: 2 }}>
                기부품
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack
                sx={{
                  width: 350,
                  height: 10,
                }}
                direction="row"
                alignItems="center"
              >
                <Box
                  sx={{
                    borderRadius: 1.25,
                    width: 80,
                    height: 25,
                    bgcolor: "#CDAD78",
                  }}
                ></Box>
                <Typography sx={{ fontSize: 13, width: 40, ml: 1 }}>
                  완료
                </Typography>
                <Box
                  sx={{
                    borderRadius: 1.25,
                    width: 80,
                    height: 25,
                    bgcolor: "#FCE2A6",
                  }}
                ></Box>
                <Typography sx={{ fontSize: 13, width: 60, ml: 1 }}>
                  진행 중
                </Typography>
                <Box
                  sx={{
                    borderRadius: 1.25,
                    width: 80,
                    height: 25,
                    bgcolor: "#dbd5ca",
                  }}
                ></Box>
                <Typography sx={{ fontSize: 13, width: 80, ml: 1 }}>
                  남은 수량
                </Typography>
              </Stack>
              <ExpiryDate></ExpiryDate>
            </Stack>
          </Stack>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    물품명
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    상세 설명
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    진행률
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    기부 가능 수량
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    총 수량
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    구매 링크
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    기부 신청
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationDetails &&
                  donationDetails.products.map((data, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {data.productName}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{}}>
                        {data.productInfo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack
                          sx={{
                            width: 300,
                          }}
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {data.finishCount === 0 ? null : (
                            <Stack
                              direction="column"
                              sx={{
                                width: `${
                                  (data.finishCount / data.totalCount) * 100
                                }%`,
                              }}
                            >
                              <Box
                                sx={{
                                  // borderTopLeftRadius: 5,
                                  // borderBottomLeftRadius: 5,
                                  height: 25,
                                  bgcolor: "#CDAD78",
                                }}
                                justifyContent="center"
                                flexDirection="column"
                                display="flex"
                              ></Box>
                              <Typography sx={{ fontSize: 11 }}>
                                {(
                                  (data.finishCount / data.totalCount) *
                                  100
                                ).toFixed()}
                                %
                              </Typography>
                            </Stack>
                          )}
                          {data.deliveryCount + data.waitingCount ===
                          0 ? null : (
                            <Stack
                              direction="column"
                              sx={{
                                width: `${
                                  ((data.deliveryCount + data.waitingCount) /
                                    data.totalCount) *
                                  100
                                }%`,
                              }}
                            >
                              <Box
                                sx={{
                                  height: 25,
                                  bgcolor: "#FCE2A6",
                                }}
                                justifyContent="center"
                                flexDirection="column"
                                display="flex"
                              ></Box>
                              <Typography sx={{ fontSize: 11 }}>
                                {(
                                  ((data.deliveryCount + data.waitingCount) /
                                    data.totalCount) *
                                  100
                                ).toFixed()}
                                %
                              </Typography>
                            </Stack>
                          )}
                          {data.totalCount -
                            data.deliveryCount -
                            data.finishCount -
                            data.waitingCount ===
                          0 ? null : (
                            <Stack
                              direction="column"
                              sx={{
                                width: `${
                                  ((data.totalCount -
                                    data.deliveryCount -
                                    data.finishCount -
                                    data.waitingCount) /
                                    data.totalCount) *
                                  100
                                }%`,
                              }}
                            >
                              <Box
                                sx={{
                                  // borderTopRightRadius: 5,
                                  // borderBottomRightRadius: 5,
                                  height: 25,
                                  bgcolor: "#dbd5ca",
                                }}
                                justifyContent="center"
                                flexDirection="column"
                                display="flex"
                              ></Box>
                              <Typography sx={{ fontSize: 11 }}>
                                {(
                                  ((data.totalCount -
                                    data.deliveryCount -
                                    data.finishCount -
                                    data.waitingCount) /
                                    data.totalCount) *
                                  100
                                ).toFixed()}
                                %
                              </Typography>
                            </Stack>
                          )}
                          {/* <Typography
                            align="center"
                            sx={{ ml: 1, fontSize: 14, width: 50 }}
                          >
                            {data.finishCount}/{data.totalCount}
                          </Typography> */}
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.totalCount -
                          data.deliveryCount -
                          data.finishCount -
                          data.waitingCount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.totalCount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip
                          title="외부 쇼핑몰 사이트로 이동합니다."
                          placement="top-end"
                        >
                          <Button
                            onClick={() =>
                              window.open(
                                `https://search.shopping.naver.com/search/all?where=all&frm=NVSCTAB&query=${data.productName}`,
                                "_blank"
                              )
                            }
                          >
                            <InsertLinkIcon
                              sx={{
                                color: "#5B321E",
                              }}
                            />
                          </Button>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {donationDetails.status !== "마감" ? (
                          <DonationApply
                            donation={data}
                            pId={data.productId}
                            router={routerId}
                            id={userId}
                            token={token}
                            applyStatus={applyStatus}
                            getStatus={getStatus}
                            role={role}
                          />
                        ) : (
                          <>마감</>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            <></>
          )}

          {commentList &&
            commentList.map((item, index) => (
              <Comment key={index} comment={item} id={userId} token={token} />
            ))}
          {commentList && commentList.length > 0 ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 5, pb:5 }}>
                <Pagination
                  paginate={paginate}
                  curPage={curPage}
                  totalPage={totalPages}
                />
              </Box>
              ): (
                <></>
              )}
        </Container>
      </Box>
    </Box>
  );
};

export default DonationOrgDetail;
