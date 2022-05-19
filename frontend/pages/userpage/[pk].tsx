import { FC } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  Table,
  Link,
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";

// import Link from "next/link";
import helpImage from "../../public/images/help.png";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

import { useRouter } from "next/router";
import { getUserInfo } from "function/axios";
import userDefaultImage from "../../public/images/userDefaultImage.png";
import Pagination from "@/components/Pagination";

// api
import { getMyTalentDonationList } from "function/axios";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFBC39" },
  },
  customColor: {
    backgroundColor: "#F8DD8E",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFBC39" },
  },
}));

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});
const UpdateButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
  // width: "50px",
});

const UpdateButton2 = styled(Button)({
  backgroundColor: "#CDAD78",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#5B321E",
    color: "white",
  },
  // width: "50px",
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
  height: 50,
}));

const UserMypageOther: FC = () => {
  const router = useRouter();

  const [myInfo, setMyInfo] = useState<any>(null);
  const [myTalentDonationList, setMyTalentDonationList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    memberId: "",
    page: curPage,
  };

  const handleOpen = (id) => {
    window.location.href = `/chatting/${id}`;
  }
  useEffect(() => {
    if (router.isReady) {
      getUserInfo(router.query.pk)
        .then((res) => {
          console.log(res.data);
          setMyInfo(res.data);
          // if (res.data.role === "USER") {
          // } else {
          //   location.href = "/";
          // }
        })
        .catch(() => (location.href = "/"));
    }
  }, [router.isReady]);

  useEffect(() => {
    params.memberId = localStorage.getItem("id");
    getMyTalentDonationList(params).then((res) => {
      setMyTalentDonationList(res.data.listTalentDonation);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      // setLoading(true);
    });
  }, [curPage]);

  return (
    <>
      {myInfo ? (
        <>
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
                  mb: 3,
                  bgcolor: "#FCF8F0",
                  borderRadius: 1.25,
                  // height: "350px",
                }}
              >
                <Grid container spacing={2} minHeight="350px">
                  <Grid item xs={3} sx={{}}>
                    <div
                      style={{
                        borderRadius: "5px",
                        overflow: "hidden",
                        marginTop: "6px",
                      }}
                    >
                      {myInfo.profile === null ? (
                        <Image
                          src={userDefaultImage}
                          alt="orgImage"
                          width="200px"
                          height="200px"
                        />
                      ) : (
                        <Image
                          src={myInfo.profile}
                          alt="orgImage"
                          width="200px"
                          height="200px"
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography sx={{ mt: 0 }} variant="h4" fontWeight="bold">
                      {myInfo.name}
                    </Typography>
                    <Grid
                      sx={{ mt: 2 }}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      <MailIcon sx={{ mr: 2 }} />
                      <Typography align="center">{myInfo.email}</Typography>
                      <Link href={`/chatting/${myInfo.memberId}`}>
                        <CustomButton>채팅하기</CustomButton>
                      </Link>
                    </Grid>
                    <Box
                      sx={{
                        bgcolor: "#f5e1be",
                        borderRadius: 1.25,
                        // height: "120px",
                      }}
                      minHeight="120px"
                    >
                      <Typography sx={{ p: 2, mt: 1 }}>
                        {myInfo.info}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="h4" fontWeight="bold">
                  재능 기부
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                          제목
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                          등록일
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myTalentDonationList &&
                        myTalentDonationList.map((data) => (
                          <StyledTableRow key={data.volunteerId}>
                            <StyledTableCell align="center" sx={{ width: 400 }}>
                              <Link
                                href={`/detail/talent/${data.volunteerId}`}
                                underline="none"
                                color="inherit"
                              >
                                {data.title}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {data.createDate.substring(0, 10)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {myTalentDonationList && myTalentDonationList.length > 0 ? (
                  <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
                    <Pagination
                      curPage={curPage}
                      paginate={paginate}
                      totalPage={totalPages}
                    />
                  </Stack>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 5,
                      mb: 5,
                      pb: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    재능기부 글이 없습니다.
                  </Typography>
                )}
              </Container>
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default UserMypageOther;
