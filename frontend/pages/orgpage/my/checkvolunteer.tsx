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
import { FC, useState, useEffect } from "react";

// api
import { getInquiryApplyList, endInquiry } from "function/axios";

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

const IsFact = ({ fact }) => {
  // const fact = props.fact;

  if (fact === 0) {
    return (
      <>
        <CustomButton sx={{ width: 40, height: 30, mr: 2 }}>참석</CustomButton>
        <CustomButton2 sx={{ width: 40, height: 30 }}>불참</CustomButton2>
      </>
    );
  } else if (fact === 1) {
    return (
      <>
        <Typography>참석</Typography>
      </>
    );
  } else if (fact === 2) {
    return (
      <>
        <Typography>불참</Typography>
      </>
    );
  }
};

const orgpageMyCheckVolunteer: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inquiryApplyList, setInquiryApplyList] = useState<any>(null);

  // pagination
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // 봉사 참여 여부
  const inquirySubmit = (id, s) => {
    console.log(id, s);
    const volunteerApplyId = id;
    const status = s;
    const token = localStorage.getItem("jwt");

    endInquiry(token, volunteerApplyId, status)
      .then((res) => {
        console.log(res + "성공");
      })
      .catch((err) => console.log(err + "실패"));
  };

  useEffect(() => {
    
    getInquiryApplyList(localStorage.getItem("id")).then((res) => {
      console.log(res.data.listApply.volunteerApplyId);
      setInquiryApplyList(res.data.listApply);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      setLoading(true);
    });
  }, [curPage]);

  return (
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
          <Typography variant="h4">봉사 현황</Typography>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    번호
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    제목
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    봉사 일자
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    신청인
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                    현황
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquiryApplyList && inquiryApplyList.map((data) => (
                  <StyledTableRow key={data.volunteerApplyId}>
                    <StyledTableCell align="center">
                      {data.volunteerApplyId}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: 400 }}>
                      {data.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.volDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IsFact fact={data.status}/>
                      {/* <CustomButton sx={{ width: 40, height: 30, mr: 2 }}>
                        참석
                      </CustomButton>
                      <CustomButton2 sx={{ width: 40, height: 30 }}>
                        불참
                      </CustomButton2> */}
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

export default orgpageMyCheckVolunteer;
