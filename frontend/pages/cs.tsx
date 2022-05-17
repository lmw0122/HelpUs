import { FC, useState, useEffect } from "react";

import { getCSList } from "function/axios";
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
  Link
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
import { locale } from "dayjs";
// import Link from "next/link";

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
  height: 62,
}));

const CsMain: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [csList, setCSList] = useState<any>(null);
  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const [myId, setMyId] = useState(0);
  const [myRole, setMyRole] = useState("");
  const params = {
    page: curPage,
  };

  useEffect(() => {
    setMyId(Number(localStorage.getItem("id")));
    setMyRole(localStorage.getItem("role"));
    getCSList(params).then((res) => {
      setCSList(res.data.desk);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      setLoading(true);
    });
  }, [curPage]);

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Stack>
          <Box textAlign="center">
            <Image
              src={volunteer1}
              alt="volunteer first"
              width={1200}
              height={200}
            />
          </Box>
          <Box sx={{ fontWeight: "bold", my: 5 }}>
            <Typography variant="h4" textAlign="center">
              문의 게시판
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton variant="contained" href="create/cs">
              글 작성
            </CustomButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
          <Stack>
            <TableContainer component={Paper} sx={{ my: 5 }}>
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
                        
                          {myRole !== "ADMIN" && data.visible === "비공개" && data.memberId !== myId ? (
                            <StyledTableCell align="center" sx={{ width: 400 }}>
                            { data.title }
                            </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center" sx={{ width: 400 }}>
                          <Link href={`/detail/cs/${data.helpDeskId}`} underline="none" color="inherit">
                          {data.title}
                        </Link>
                        </StyledTableCell>
                            )
                          }
                        
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
          </Stack>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Pagination
              curPage={curPage}
              paginate={paginate}
              totalPage={totalPages}
            />
          </Stack>
        </Stack>
      </Grid>
    </div>
  );
};

export default CsMain;
