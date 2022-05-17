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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";

import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { getMyvolunteerList } from "../../../function/axios";
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
}));

const Unix_timestamp = (t) => {
  var date = new Date(t);
  date.setHours(date.getHours()+9)
  var year = date.getFullYear();
  var month = "0" + (date.getMonth()+1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2)
}

// const ConvertTime = ((stringTime) => ({
//   console.log(stringTime);
//   let converted = new Date(stringTime);

// }));
const UserMypageVolunteer: FC = () => {
  const [volunteerList, setVolunteerList] = useState([]);

  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    page: curPage,
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    getMyvolunteerList(id, params).then((res) => {
      let tmpList = res.data.listVolunteer.filter((data) => data.status !== 2);
      let converted = new Date(tmpList[0].volDate);
      console.log(converted);
      console.log(converted.getHours);
      console.log(typeof (tmpList[0].volDate))
      setVolunteerList(tmpList);
      setTotalPages(res.data.totalPage);
    });
  }, [curPage]);
  return (
    <>
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
            <Typography variant="h4">봉사 조회</Typography>
            <TableContainer component={Paper} sx={{ mt: 5 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      봉사글
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      제목
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      일시
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      주소
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기관명
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      시간
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      상태
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerList &&
                    volunteerList.map((data) => (
                      <StyledTableRow key={data.volunteerId}>
                        <StyledTableCell align="center">
                          <Link href={`/detail/volunteer/${data.volunteerId}`}>
                            <Button>
                              <InsertLinkIcon
                                sx={{
                                  color: "#5B321E",
                                }}
                              />
                            </Button>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 200 }}>
                          {data.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {Unix_timestamp(data.volDate)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.volAddress}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.time}
                        </StyledTableCell>
                        {
                          data.status === 0 ? (
                            <StyledTableCell align="center">
                              대기
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell align="center">
                              완료
                            </StyledTableCell>
                          )
                        }
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {volunteerList && volunteerList.length > 0 ? (
            <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
            <Pagination
              curPage={curPage}
              paginate={paginate}
              totalPage={totalPages}
            />
          </Stack>
          ) : (
            <Typography variant="h5" sx={{ mt: 10, display: 'flex', justifyContent: 'center'}}>봉사 내역이 없습니다.</Typography>
          )}
          </Container>
        </Box>
      </Box>
      <style jsx>
        {`
          .no {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default UserMypageVolunteer;
