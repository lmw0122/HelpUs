import { FC, useState, useEffect } from "react";
import { getNewsList } from "function/axios";
import Pagination from "@/components/Pagination";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  Button,
  InputBase,
  Paper,
  Tabs,
  ThemeProvider,
} from "@mui/material/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import volunteer1 from "../public/images/volunteer1.jpg";
import CarouselMain from "../components/CarouselMain";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
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
  // height: 70,
  // rowStyle: { height: 50 },
  // maxHeight: ,
}));

const NewsMain: FC = () => {
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: "#5B321E",
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    page: curPage,
  };

  useEffect(() => {
    getNewsList(params).then((res) => {
      setNewsList(res.data.news);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      setLoading(true);
    });
  }, [curPage]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Stack>
          <Box textAlign="center">
            {/* 이미지 출력 부분 */}
            <Stack alignItems="center" sx={{ mb: 5 }}>
              <CarouselMain />
            </Stack>
          </Box>
          <Box sx={{ fontWeight: "bold", mt: 5 }}>
            <Typography variant="h4" textAlign="center">
              기부 News
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack sx={{ width: "90%" }}>
              <TableContainer
                component={Paper}
                sx={{ my: 5 }}
                // style={{ maxHeight: 700 }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        제목
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        내용
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        작성일
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newsList &&
                      newsList.map((data) => (
                        <StyledTableRow
                          key={data.title}
                          onClick={() => window.open(`${data.link}`)}
                        >
                          <StyledTableCell sx={{ width: "20%" }}>
                            {/* {data.title.substr(0, 17)}... */}
                            {data.title}
                          </StyledTableCell>
                          <StyledTableCell>{data.description}</StyledTableCell>
                          <StyledTableCell sx={{ width: "14%" }}>
                            {data.date}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Pagination
              curPage={curPage}
              paginate={paginate}
              totalPage={totalPages}
            />
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default NewsMain;
