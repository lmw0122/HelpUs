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
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Link from "next/link";

// api
import { getPostCompany } from "../../../function/axios";

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

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5B321E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5B321E",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CDAD78",
    },
    "&:hover fieldset": {
      borderColor: "#5B321E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5B321E",
    },
  },
});

const CssAutocomplete = styled(Autocomplete)({
  "& label.Mui-focused": {
    color: "#5B321E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5B321E",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CDAD78",
    },
    "&:hover fieldset": {
      borderColor: "#5B321E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5B321E",
    },
  },
});

const dummyData = [
  {
    donationApplyId: 1,
    donationId: 1,
    title: "기부가 필요합니다.",
    memberId: 1,
    name: "이다예 복지관",
    donationDate: "2022-05-20",
    parcel: "대한통운",
    invoice: 222222,
    productName: "감자",
    count: 5,
    status: "배송대기",
  },
  {
    donationApplyId: 2,
    donationId: 1,
    title: "기부가 필요합니다.",
    memberId: 1,
    name: "이다예 복지관",
    donationDate: "2022-05-20",
    parcel: "대한통운",
    invoice: 222222,
    productName: "감자",
    count: 5,
    status: "배송대기",
  },
  {
    donationApplyId: 3,
    donationId: 1,
    title: "기부가 필요합니다.",
    memberId: 1,
    name: "이다예 복지관",
    donationDate: "2022-05-20",
    parcel: "대한통운",
    invoice: 222222,
    productName: "감자",
    count: 5,
    status: "배송대기",
  },
];

const UserMypageDelivery: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 택배사 리스트 api
  const [companyList, setCompanyList] = useState<any[]>([]);

  // 송장 정보 입력 - 택배사
  const [company, setCompany] = useState<any>("");

  const filterOptions = createFilterOptions({
    stringify: ({ Name }) => `${Name}`,
  });

  const getCompany = (event, value) => {
    setCompany(value.Code);
    console.log("선택된", company);
  };

  useEffect(() => {
    getPostCompany().then((res) => {
      setCompanyList(res.data.Company);
    });
    setLoading(true);
  }, []);

  return (
    <>
      {companyList ? (
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
              <Typography variant="h4">기부 물품 배송 관리</Typography>
              <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        번호
                      </StyledTableCell>
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
                        상태
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        배송조회
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                        송장입력
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.map((data) => (
                      <StyledTableRow key={data.donationApplyId}>
                        <StyledTableCell align="center">
                          {data.donationApplyId}
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: 200 }}>
                          {data.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link href={"/detail/donationorg/1"}>
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
                          {data.status}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <CustomButton2 sx={{ width: 40, height: 30 }}>
                            조회
                          </CustomButton2>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Stack direction="row">
                            <Stack alignItems="center">
                              <CssAutocomplete
                                onChange={getCompany}
                                sx={{
                                  backgroundColor: "#ffffff",
                                  width: 150,
                                  m: 1,
                                }}
                                freeSolo
                                disableClearable
                                options={companyList}
                                getOptionLabel={(option) => option["Name"]}
                                filterOptions={filterOptions}
                                renderInput={(params) => (
                                  <CssTextField
                                    // onChange={getCompany}
                                    {...params}
                                    label="택배사"
                                    InputProps={{
                                      ...params.InputProps,
                                      type: "search",
                                    }}
                                  />
                                )}
                              />
                              <CssTextField
                                sx={{ backgroundColor: "#ffffff", width: 150 }}
                                size="small"
                              />
                            </Stack>
                            <Stack justifyContent="center">
                              <CustomButton>입력</CustomButton>
                            </Stack>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default UserMypageDelivery;
