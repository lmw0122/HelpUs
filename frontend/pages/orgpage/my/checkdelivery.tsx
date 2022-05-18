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
import { FC, useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

// api
import { getDeliveryList, endDelivery } from "function/axios";
import { WindowSharp } from "@mui/icons-material";

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

const orgpageMyCheckDelivery: FC = () => {
  // 배송 현황 리스트
  const [deliveryList, setDeliveryList] = useState<any>("");

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // 도착 완료
  const deliverySubmit = (e) => {
    const id = localStorage.getItem("id");
    const donationApplyId = e;
    const token = localStorage.getItem("jwt");

    endDelivery(token, donationApplyId, id)
      .then((res) => {
        console.log(res + "성공");
      })
      .catch((err) => console.log(err + "실패"));
  };

  useEffect(() => {
    const memberId = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const params = {
      page: curPage,
    };
    getDeliveryList(memberId, token,params).then((res) => {
      setDeliveryList(res.data.apply);
      setTotalPages(res.data.totalPage);
    });
  }, [deliverySubmit]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <OrgMypageSidebar />
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
            <Typography variant="h4">배송 현황</Typography>
            <TableContainer component={Paper} sx={{ mt: 5 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기부 번호
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      글 제목
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      물품 상세
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      수량
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      빌송인
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      기부 신청일
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      배송 조회
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      현황
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryList &&
                    deliveryList.map((data) => (
                      <StyledTableRow key={data.donationApplyId}>
                        <StyledTableCell align="center">
                          {data.donationApplyId}
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 300 }}>
                          {data.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.productName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.count}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {data.donationDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <>
                            <form
                              action="http://info.sweettracker.co.kr/tracking/5"
                              method="post"
                            >
                              <div className="no">
                                <label>API key</label>
                                <input
                                  type="text"
                                  id="t_key"
                                  name="t_key"
                                  placeholder="제공받은 APIKEY"
                                  value={
                                    process.env.NEXT_PUBLIC_POST_TRACKER_API_KEY
                                  }
                                  readOnly
                                />
                              </div>
                              <div className="no">
                                <label>택배사 코드</label>
                                <input
                                  type="text"
                                  name="t_code"
                                  id="t_code"
                                  placeholder="택배사 코드"
                                  value={data.parcel}
                                  readOnly
                                />
                              </div>
                              <div className="no">
                                <label>운송장 번호</label>
                                <input
                                  type="text"
                                  name="t_invoice"
                                  id="t_invoice"
                                  placeholder="운송장 번호"
                                  value={data.invoice}
                                  readOnly
                                />
                              </div>
                              <CustomButton2
                                sx={{ width: 80, height: 30 }}
                                type="submit"
                              >
                                조회하기
                              </CustomButton2>
                            </form>
                          </>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <CustomButton
                            sx={{ width: 80, height: 30 }}
                            onClick={() => deliverySubmit(data.donationApplyId)}
                          >
                            도착완료
                          </CustomButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {deliveryList && deliveryList.length > 0 ? (
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

export default orgpageMyCheckDelivery;
