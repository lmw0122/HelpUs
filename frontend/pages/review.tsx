import { FC, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  Button,
  InputBase,
  Paper,
} from "@mui/material/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import volunteer1 from "../public/images/volunteer1.jpg";

import { getReviewList } from "function/axios";
import Pagination from "@/components/Pagination";
import CarouselMain from "../components/CarouselMain";


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

const Review: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    page: curPage,
  };

  useEffect(() => {
    getReviewList(params).then((res) => {
      setReviewList(res.data.confirm);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      // console.log(res)
      setLoading(true);
    });
  }, [curPage]);

  return (
    <>
      {loading ? (
        <div>
          <Grid container justifyContent="center" alignItems="center">
            <Stack>
              <Box textAlign="center">
                {/* 이미지 출력 부분 */}
                <Stack alignItems="center" sx={{ mb: 5 }}>
                  <CarouselMain />
                  {/* <Image
                    src={volunteer1}
                    alt="volunteer first"
                    width={1200}
                    height={200}
                  /> */}
                </Stack>
              </Box>
              <Box sx={{ fontWeight: "bold", my: 5 }}>
                <Typography variant="h4" textAlign="center">
                  후기
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 250,
                  }}
                >
                  <InputBase sx={{ ml: 1, flex: 1 }} placeholder="검색" />
                  <IconButton type="submit" sx={{ p: "10px" }}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>
              <TableContainer component={Paper} sx={{ my: 5 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {/* <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        번호
                      </StyledTableCell> */}
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        제목
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        기관명
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        작성일
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviewList.map((data) => (
                      <StyledTableRow key={data.donationConfirmId}>
                        {/* <StyledTableCell align="center">
                          {data.donationConfirmId}
                        </StyledTableCell> */}
                        <StyledTableCell align="center" sx={{ width: 400 }}>
                          {data.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.createDate.substr(0, 10)}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack alignItems="center" sx={{ mb: 2 }}>
                <Pagination
                  curPage={curPage}
                  paginate={paginate}
                  totalPage={totalPages}
                />
              </Stack>
            </Stack>
          </Grid>
        </div>
      ) : null}
    </>
  );
};

export default Review;
