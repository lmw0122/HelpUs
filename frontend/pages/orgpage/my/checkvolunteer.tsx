import OrgMypageSidebar from "@/components/OrgMypageSidebar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";
import CheckVolunteer from "@/components/CheckVolunteer";
import Pagination from "@/components/Pagination";
import Link from "next/link";

// api
import { getInquiryApplyList, endInquiry } from "function/axios";

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

const orgpageMyCheckVolunteer: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inquiryApplyList, setInquiryApplyList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const [userToken, setUserToken] = useState<any>("");
  const [userId, setUserId] = useState<any>("");
  const [volStatus, setVolStatus] = useState<boolean>(false);
  const getData = (volStatus) => {
    setVolStatus(volStatus);
  };
  const params = {
    id: "",
    page: curPage,
  };

  useEffect(() => {
    setUserToken(localStorage.getItem("jwt"));
    setUserId(localStorage.getItem("id"));
    params.id = localStorage.getItem("id");
    getInquiryApplyList(params).then((res) => {
      setInquiryApplyList(res.data.listApply);

      // console.log(res.data);
      setTotalPages(res.data.totalPage);
      setLoading(true);
    });
  }, [curPage, volStatus]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <OrgMypageSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "85vh",
          overflow: "auto",
          mt: 0,
        }}
      >
        <Container maxWidth="lg" sx={{}}>
          <Typography variant="h4">봉사 현황</Typography>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    제목
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    봉사 일자
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    신청인
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    현황
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryApplyList &&
                  inquiryApplyList.map((data) => (
                    <StyledTableRow key={data.volunteerApplyId}>
                      <StyledTableCell align="center" sx={{ width: 400 }}>
                        {data.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Unix_timestamp(data.volDate)}
                        {/* {data.volDate} */}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link href={`/userpage/${data.memberId}`}>
                          {data.name}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <CheckVolunteer
                          userId={userId}
                          fact={data.status}
                          id={data.volunteerApplyId}
                          token={userToken}
                          getData={getData}
                          volStatus={volStatus}
                        />
                        {/* <IsFact fact={data.status} /> */}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {inquiryApplyList && inquiryApplyList.length > 0 ? (
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
              sx={{ mt: 10, display: "flex", justifyContent: "center" }}
            >
              진행 중인 봉사가 없습니다.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default orgpageMyCheckVolunteer;
