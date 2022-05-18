import { FC, useEffect } from "react";
import OrgMypageSidebar from "../../../components/OrgMypageSidebar";
import Image from "next/image";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import helpImage from "../../../public/images/help.png";

import DonationCardOrg from "../../../components/DonationCardOrg";
import DonationCard from "../../../components/DonationCard";
import ReviewCard from "../../../components/ReviewCard";
import DonationCardOrgReview from "@/components/DonationCardOrgReview";
import Pagination from "@/components/Pagination";
import { tableCellClasses } from "@mui/material/TableCell";

// api
import { getNoReviewDonation, getMyReviewOrg } from "function/axios";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    width: 100,
    backgroundColor: "#CDAD78",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#8a867e",
  "&.Mui-selected": {
    color: "#CDAD78",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const orgpageMyReview: FC = () => {
  const [value, setValue] = useState(0);

  const [userInfo, setUserInfo] = useState<boolean>(false);

  // pagination1
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // pagination2
  const [curPage2, setCurPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(0);
  const paginate2 = (pageNumber) => setCurPage2(pageNumber);

  const [userToken, setUserToken] = useState<any>("");
  const [userId, setUserId] = useState<any>("");

  const [donations, setDonations] = useState<any>("");
  const [reviews, setReviews] = useState<any>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setUserToken(localStorage.getItem("jwt"));
    setUserId(localStorage.getItem("id"));
    // console.log("cccc", userId);
  }, []);

  useEffect(() => {
    const mId = localStorage.getItem("id");
    const mToken = localStorage.getItem("jwt");

    const params = {
      memberId: mId,
      donationStatus: "미작성",
      page: curPage,
    };

    const params2 = {
      memberId: mId,
      page: curPage2,
    };

    getNoReviewDonation(mToken, mId, params).then((res) => {
      setDonations(res.data.donation);
      setTotalPages(res.data.totalPage);
      setUserInfo(true);
    });

    getMyReviewOrg(params2).then((res) => {
      setReviews(res.data.confirm);
      setTotalPages2(res.data.totalPage);
    });
  }, [curPage, curPage2]);

  return (
    <>
      {userInfo ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <OrgMypageSidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // height: "100vh",
              overflow: "auto",
              mt: 0,
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4" fontWeight="bold">
                  기부 후기
                </Typography>
              </Stack>
              <Grid>
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Box sx={{ borderRadius: 1.25 }}>
                    <StyledTabs
                      value={value}
                      onChange={handleChange}
                      aria-label="styled tabs example"
                    >
                      <StyledTab
                        sx={{ fontWeight: "bold" }}
                        label="미작성"
                        {...a11yProps(0)}
                      />
                      <StyledTab
                        sx={{ fontWeight: "bold" }}
                        label="작성"
                        {...a11yProps(1)}
                      />
                    </StyledTabs>
                    <TabPanel value={value} index={0}>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, 300px)",
                          justifyContent: "center",
                          alignItems: "center",
                          rowGap: 5,
                          columnGap: 7,
                        }}
                      >
                        {donations && donations.length > 0 ? (
                          donations.map((item, i) => (
                            <DonationCardOrgReview
                              key={i}
                              item={item}
                              // token={userToken}
                              // id={mId}
                              // getStatus={getStatus}
                              // fStatus={fStatus}
                            />
                          ))
                        ) : (
                          <Typography>미작성 후기가 없습니다.</Typography>
                        )}
                      </Box>
                      {donations && donations.length > 0 ? (
                        <Stack alignItems="center" sx={{ mb: 3, mt: 3 }}>
                          <Pagination
                            curPage={curPage}
                            paginate={paginate}
                            totalPage={totalPages}
                          />
                        </Stack>
                      ) : (
                        <></>
                      )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {reviews && reviews.length > 0 ? (
                        <TableContainer component={Paper} sx={{ my: 5 }}>
                          <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell
                                  align="center"
                                  sx={{ fontSize: 17 }}
                                >
                                  기부글 번호
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  sx={{ fontSize: 17 }}
                                >
                                  제목
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  sx={{ fontSize: 17 }}
                                >
                                  작성일
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {reviews &&
                                reviews.map((data) => (
                                  <StyledTableRow key={data.donationConfirmId}>
                                    <StyledTableCell
                                      align="center"
                                      sx={{ width: 400 }}
                                    >
                                      {data.donationConfirmId}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <Link href={`/detail/review/${data.donationConfirmId}`} underline="none" color="inherit">
                                        {data.title}
                                      </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {data.createDate.substr(0, 10)}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography
                          variant="h5"
                          sx={{
                            mt: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          작성된 리뷰가 없습니다.
                        </Typography>
                      )}
                    </TabPanel>
                    {/* {reviews && reviews.length > 0 ? (
                      <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
                        <Pagination
                          curPage={curPage2}
                          paginate={paginate2}
                          totalPage={totalPages2}
                        />
                      </Stack>
                    ) : null} */}
                  </Box>
                </Box>
              </Grid>
            </Container>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default orgpageMyReview;
