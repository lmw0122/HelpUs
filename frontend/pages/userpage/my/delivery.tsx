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
  FormControl,
  Select,
  TextField,
  InputLabel,
  MenuItem,
  Modal,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Link from "next/link";

import PostInfo from "../../../components/PostInfo";

import Pagination from "@/components/Pagination";

// api
import { getApplyList } from "../../../function/axios";
import axios from "axios";
import { display } from "@mui/system";

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

const UserMypageDelivery: FC = () => {
  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    page: curPage,
  };

  const [loading, setLoading] = useState<boolean>(true);

  const [applyList, setApplyList] = useState<any>([]);

  // 배송 입력 여부 상태
  const [postStatus, setPostStatus] = useState<boolean>(false);

  const getStatus = (postStatus) => {
    setPostStatus(postStatus);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const id = localStorage.getItem("id");
    getApplyList(id, params, token).then((res) => {
      setApplyList(res.data.apply);
      // console.log(res.data);
      setTotalPages(res.data.totalPage);
    });
  }, [curPage, PostInfo, postStatus]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <UserMypageSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // height: "90vh",
            minHeight: "90vh",
            overflow: "auto",
            mt: 0,
          }}
        >
          <Container maxWidth="lg" sx={{}}>
            <Typography variant="h4" sx={{ mt: 5 }}>
              기부 물품 배송 관리
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 5 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기관명
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기부글
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      물품명
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      수량
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기한
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      송장입력
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applyList &&
                    applyList.map((data) => (
                      <StyledTableRow key={data.donationApplyId}>
                        <StyledTableCell align="center" sx={{ width: 200 }}>
                          <Link href={`/orgpage/${data.memberId}`}>
                            {data.name}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link href={`/detail/donationorg/${data.donationId}`}>
                            <Button>
                              <InsertLinkIcon
                                sx={{
                                  color: "#5B321E",
                                }}
                              />
                            </Button>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.productName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.count}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.donationDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.parcel === null ? (
                            <PostInfo
                              donationApplyId={data.donationApplyId}
                              memberId={data.memberId}
                              getStatus={getStatus}
                              postStatus={postStatus}
                            />
                          ) : (
                            <Typography>등록 완료</Typography>
                            // <Stack
                            //   direction="row"
                            //   alignItems="center"
                            //   justifyContent="center"
                            //   spacing={2}
                            // >
                            //   <Typography>등록 완료</Typography>
                            //   <CustomButton size="small">수정</CustomButton>
                            // </Stack>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {applyList && applyList.length > 0 ? (
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
                진행 중인 배송이 없습니다.
              </Typography>
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

export default UserMypageDelivery;
