import { FC, useState, useEffect, FormEvent } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  InputBase,
  Paper,
  Link,
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
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import volunteer1 from "../public/images/volunteer1.jpg";
import Pagination from "@/components/Pagination";
import {
  getTalentDonationList,
  searchTalentDonationList,
} from "function/axios";
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
  height: 62,
}));

const Share: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [talentDonationList, setTalentDonationList] = useState<any>(null);
  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const params = {
    page: curPage,
    keyword: null,
  };

  const [myId, setMyId] = useState(0);
  const [myRole, setMyRole] = useState("");
  const [keyword, setKeyword] = useState("");

  const Search = (e: FormEvent) => {
    e.preventDefault();
    console.log(keyword);
    if (keyword === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    setLoading(false);
    searchTalentDonationList(keyword, params).then((res) => {
      console.log(res);
      setTalentDonationList(res.data.listTalentDonation);
      setTotalPages(res.data.totalPage);
      setLoading(true);
    });
  };

  useEffect(() => {
    setMyId(Number(localStorage.getItem("id")));
    setMyRole(localStorage.getItem("role"));
    getTalentDonationList(params).then((res) => {
      setTalentDonationList(res.data.listTalentDonation);
      setTotalPages(res.data.totalPage);
      console.log("data는", talentDonationList);
      setLoading(true);
    });
  }, [curPage]);
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

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Stack>
          <Box textAlign="center">
            {/* 이미지 출력 부분 */}
            <Stack alignItems="center" sx={{ mb: 5 }}>
              <CarouselMain />
            </Stack>
          </Box>
          <Box sx={{ fontWeight: "bold", my: 5 }}>
            <Typography variant="h4" textAlign="center">
              재능 기부 목록
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {myRole === "USER" ? (
              <CustomButton variant="contained" href="create/talent">
                재능 기부 등록
              </CustomButton>
            ) : (
              <></>
            )}
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
              onSubmit={Search}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색"
                onChange={(event) => {
                  //adding the onChange event
                  setKeyword(event.target.value);
                }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} onClick={Search}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <TableContainer component={Paper} sx={{ my: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    제목
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    작성자
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    작성일
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {talentDonationList &&
                  talentDonationList.map((data) => (
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
                        {data.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Unix_timestamp(data.createDate)}
                        {/* {data.createDate} */}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {talentDonationList && talentDonationList.length > 0 ? (
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
              등록된 글이 없습니다.
            </Typography>
          )}
        </Stack>
      </Grid>
    </div>
  );
};

export default Share;
