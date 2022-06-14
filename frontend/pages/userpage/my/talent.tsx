import UserMypageSidebar from "@/components/UserMypageSidebar";
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
  Link,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";
import { getMyTalentDonationList } from "function/axios";

import Pagination from "@/components/Pagination";
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

const UserMypageTalent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myTalentDonationList, setMyTalentDonationList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const params = {
    memberId: "",
    page: curPage,
  };

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

  useEffect(() => {
    params.memberId = localStorage.getItem("id");
    getMyTalentDonationList(params).then((res) => {
      setMyTalentDonationList(res.data.listTalentDonation);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      setLoading(true);
    });
  }, [curPage]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserMypageSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          mt: 0,
        }}
      >
        <Container maxWidth="lg" sx={{}}>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
            <Typography variant="h4">재능 기부 글</Typography>
            <CustomButton href="../../create/talent">글 작성</CustomButton>
          </Stack>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
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
                        {Unix_timestamp(data.createDate)}
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
              sx={{ mt: 10, display: "flex", justifyContent: "center" }}
            >
              재능기부 글이 없습니다.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UserMypageTalent;
