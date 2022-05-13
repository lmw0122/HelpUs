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
  Link
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";

import { getCSList } from "function/axios";
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

const UserMypageCs: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [csList, setCSList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    memberId: "",
    page: curPage + 1,
  };

  useEffect(() => {
    params.memberId = localStorage.getItem("id");
    getCSList(params).then((res) => {
      setCSList(res.data.desk);
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
          <Typography variant="h4">문의 내역</Typography>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    번호
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    카테고리
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    제목
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    작성일
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    공개 여부
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    답변 여부
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csList &&
                  csList.map((data) => (
                    <StyledTableRow key={data.helpDeskId}>
                      <StyledTableCell align="center">
                        {data.helpDeskId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.category}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 400 }}>
                        <Link href={`/detail/cs/${data.helpDeskId}`} underline="none" color="inherit">
                          {data.title}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.createDate.substr(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.visible}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.status}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default UserMypageCs;
