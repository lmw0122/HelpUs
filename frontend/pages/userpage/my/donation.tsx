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
import { getUserDonationList, getPostCompany } from "../../../function/axios";

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

const UserMypageDonation: FC = () => {
  const [donationList, setDonationList] = useState([]);

  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // 택배사 리스트 api
  const [companyList, setCompanyList] = useState<any[]>([]);

  const params = {
    page: curPage,
  };

  // 택배사 코드 -> 이름
  const findCompanyName = (id) => {
    var result = "";
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].Code.toString() == id.toString()) {
        result = companyList[i].Name;
        return result;
      }
    }
  };

  useEffect(() => {
    getPostCompany().then((res) => {
      setCompanyList(res.data.Company);
    });
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");
    getUserDonationList(id, params).then((res) => {
      setDonationList(res.data.apply);
      console.log(res.data);
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
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 5 }}
            >
              <Typography variant="h4">물품 기부 조회</Typography>
              <Link href="/certi">
                <UpdateButton style={{ marginLeft: "10px", marginTop: "5px" }}>
                  증명서 발급
                </UpdateButton>
              </Link>
            </Stack>
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
                      기부일자
                    </StyledTableCell>
                    {/* <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      송장 번호
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      택배사
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donationList &&
                    donationList.map((data) => (
                      <StyledTableRow key={data.donationApplyId}>
                        <StyledTableCell align="center" sx={{ width: 200 }}>
                          {data.name}
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
                        {/* <StyledTableCell align="center">
                          {data.invoice}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {findCompanyName(data.parcel)}
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {donationList && donationList.length > 0 ? (
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
                기부 내역이 없습니다.
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

export default UserMypageDonation;
