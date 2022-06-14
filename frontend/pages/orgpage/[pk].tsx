import { FC } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import DonationCardOrg from "@/components/DonationCardOrg";
import DonationCardOrgFinish from "@/components/DonationCardOrgFinish";
import ReviewCard from "@/components/ReviewCard";
import DonationCard from "@/components/DonationCard";
import VolunteerCard from "@/components/VolunteerCard";

import TestImage from "../../public/images/testImage.jpg";
import { useRouter } from "next/router";
import { getUserInfo } from "function/axios";
import defaultImage from "../../public/images/defaultImage.png";
import Pagination from "@/components/Pagination";
import { tableCellClasses } from "@mui/material/TableCell";

// api
import {
  getOrgpageDonation,
  getMyReviewOrg,
  getVolunteerOrg,
} from "function/axios";

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

const OrgPage: FC = () => {
  const router = useRouter();

  const [thisMId, setThisMId] = useState<any>("");

  const [myInfo, setMyInfo] = useState<any>(null);
  const [value, setValue] = useState(0);

  const [ingDonation, setIngDonation] = useState<any>("");
  const [doneDonation, setDonaDonation] = useState<any>("");
  const [review, setReview] = useState<any>("");

  const [ingVolunteer, setIngVolunteer] = useState<any>("");
  const [doneVolunteer, setDoneVolunteer] = useState<any>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // pagination
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // pagination2
  const [curPage2, setCurPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(0);
  const paginate2 = (pageNumber) => setCurPage2(pageNumber);

  // pagination3 - 후기
  const [curPage3, setCurPage3] = useState(1);
  const [totalPages3, setTotalPages3] = useState(0);
  const paginate3 = (pageNumber) => setCurPage3(pageNumber);

  // pagination4 - 진행 중 봉사
  const [curPage4, setCurPage4] = useState(1);
  const [totalPages4, setTotalPages4] = useState(0);
  const paginate4 = (pageNumber) => setCurPage4(pageNumber);

  // pagination5 - 마감된 봉사
  const [curPage5, setCurPage5] = useState(1);
  const [totalPages5, setTotalPages5] = useState(0);
  const paginate5 = (pageNumber) => setCurPage5(pageNumber);

  useEffect(() => {
    if (router.isReady) {
      setThisMId(router.query.pk);
      getUserInfo(router.query.pk)
        .then((res) => {
          setMyInfo(res.data);
          // if (res.data.role === "ORG_WAIT" || res.data.role === "ORG") {
          // } else {
          //   location.href = "/";
          // }
        })
        .catch(() => (location.href = "/"));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      const params = {
        memberId: router.query.pk,
        page: curPage,
        donationStatus: "진행",
      };
      getOrgpageDonation(params).then((res) => {
        setIngDonation(res.data.donation);
        setTotalPages(res.data.totalPage);
      });

      const params2 = {
        memberId: router.query.pk,
        page: curPage2,
        donationStatus: "마감",
      };
      getOrgpageDonation(params2).then((res) => {
        setDonaDonation(res.data.donation);
        setTotalPages2(res.data.totalPage);
      });

      const params3 = {
        memberId: router.query.pk,
        page: curPage3,
      };
      getMyReviewOrg(params3).then((res) => {
        setReview(res.data.confirm);
        setTotalPages3(res.data.totalPage);
      });

      const params4 = {
        page: curPage4,
        status: 0,
      };
      getVolunteerOrg(router.query.pk, params4).then((res) => {
        setIngVolunteer(res.data.listVolunteer);
        setTotalPages4(res.data.totalPage);
      });

      const params5 = {
        page: curPage5,
        status: 1,
      };
      getVolunteerOrg(router.query.pk, params5).then((res) => {
        setDoneVolunteer(res.data.listVolunteer);
        setTotalPages5(res.data.totalPage);
      });
    }
  }, [router.isReady, curPage, curPage2, curPage3, curPage4, curPage5]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // height: "100vh",
          overflow: "auto",
          mt: 0,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            bgcolor: "#FCF8F0",
            borderRadius: 1.25,
            // height: "350px",
          }}
        >
          <Grid container spacing={2} minHeight="350px">
            <Grid item xs={3}>
              <div
                style={{
                  borderRadius: "3%",
                  overflow: "hidden",
                  marginTop: "6px",
                  // height: "300px",
                }}
              >
                {myInfo !== null ? (
                  myInfo.profile === null ? (
                    <Image
                      src={defaultImage}
                      alt="orgImage"
                      width="300px"
                      height="300px"
                    />
                  ) : (
                    <Image
                      src={myInfo.profile}
                      alt="orgImage"
                      width="300px"
                      height="300px"
                    />
                  )
                ) : null}
              </div>
            </Grid>
            {myInfo ? (
              <>
                <Grid item xs={9}>
                  <Typography sx={{ mt: 0 }} variant="h4" fontWeight="bold">
                    {myInfo.name}
                  </Typography>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <BusinessIcon sx={{ mr: 2 }} />
                    <Typography align="center">{myInfo.address}</Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <CallIcon sx={{ mr: 2 }} />
                    <Typography align="center">{myInfo.tel}</Typography>
                  </Grid>
                  <Grid
                    sx={{ mt: 2 }}
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <MailIcon sx={{ mr: 2 }} />
                    <Typography align="center">{myInfo.email}</Typography>
                  </Grid>
                  <Box
                    sx={{
                      bgcolor: "#f5e1be",
                      borderRadius: 1.25,
                      // height: "120px",
                    }}
                    minHeight="120px"
                  >
                    <Typography sx={{ p: 2, mt: 1 }}>{myInfo.info}</Typography>
                  </Box>
                </Grid>
              </>
            ) : null}
          </Grid>
          <Box sx={{ width: "100%", mt: 2 }}>
            <Box sx={{ bgcolor: "#FCF8F0", borderRadius: 1.25 }}>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs example"
              >
                <StyledTab
                  sx={{ fontWeight: "bold" }}
                  label="기부"
                  {...a11yProps(0)}
                />
                <StyledTab
                  sx={{ fontWeight: "bold" }}
                  label="봉사"
                  {...a11yProps(1)}
                />
                <StyledTab
                  sx={{ fontWeight: "bold" }}
                  label="후기"
                  {...a11yProps(2)}
                />
              </StyledTabs>
              <TabPanel value={value} index={0}>
                <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
                  진행 중인 기부
                </Typography>
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
                  {ingDonation && ingDonation.length > 0 ? (
                    ingDonation.map((item, i) => (
                      <DonationCard donation={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      진행 중인 기부글이 없습니다.
                    </Typography>
                  )}
                </Box>
                {ingDonation && ingDonation.length > 0 ? (
                  <Stack alignItems="center" sx={{ mb: 2, mt: 5 }}>
                    <Pagination
                      curPage={curPage}
                      paginate={paginate}
                      totalPage={totalPages}
                    />
                  </Stack>
                ) : null}
                <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
                  마감된 기부
                </Typography>
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
                  {doneDonation && doneDonation.length > 0 ? (
                    doneDonation.map((item, i) => (
                      <DonationCardOrgFinish item={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      마감된 기부가 없습니다.
                    </Typography>
                  )}
                </Box>
                {doneDonation && doneDonation.length > 0 ? (
                  <Stack alignItems="center" sx={{ mb: 2, mt: 5 }}>
                    <Pagination
                      curPage={curPage2}
                      paginate={paginate2}
                      totalPage={totalPages2}
                    />
                  </Stack>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
                  진행 중인 봉사
                </Typography>
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
                  {ingVolunteer && ingVolunteer.length > 0 ? (
                    ingVolunteer.map((item, i) => (
                      <VolunteerCard volunteer={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      진행 중인 봉사가 없습니다.
                    </Typography>
                  )}
                </Box>
                {ingVolunteer && ingVolunteer.length > 0 ? (
                  <Stack alignItems="center" sx={{ mb: 2, mt: 5 }}>
                    <Pagination
                      curPage={curPage4}
                      paginate={paginate4}
                      totalPage={totalPages4}
                    />
                  </Stack>
                ) : null}
                <Typography fontWeight="bold" variant="h5" sx={{ mb: 2 }}>
                  마감된 봉사
                </Typography>
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
                  {doneVolunteer && doneVolunteer.length > 0 ? (
                    doneVolunteer.map((item, i) => (
                      <VolunteerCard volunteer={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      마감된 봉사가 없습니다.
                    </Typography>
                  )}
                </Box>
                {doneVolunteer && doneVolunteer.length > 0 ? (
                  <Stack alignItems="center" sx={{ mb: 2, mt: 5 }}>
                    <Pagination
                      curPage={curPage5}
                      paginate={paginate5}
                      totalPage={totalPages5}
                    />
                  </Stack>
                ) : null}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {review && review.length > 0 ? (
                  <>
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
                          {review &&
                            review.map((data) => (
                              <StyledTableRow key={data.donationConfirmId}>
                                <StyledTableCell
                                  align="center"
                                  sx={{ width: 400 }}
                                >
                                  {data.donationConfirmId}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {data.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {data.createDate.substr(0, 10)}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {review && review.length > 0 ? (
                      <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
                        <Pagination
                          curPage={curPage3}
                          paginate={paginate3}
                          totalPage={totalPages3}
                        />
                      </Stack>
                    ) : (
                      <Typography
                        variant="h5"
                        sx={{
                          mt: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        진행 중인 배송이 없습니다.
                      </Typography>
                    )}
                  </>
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
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OrgPage;
