import react, { useEffect, useState, FC } from "react";
// import type { NextPage } from "next";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Tabs,
  CssBaseline,
  Container,
  Button,
} from "@mui/material/";
// import { TabContext, TabList, TabPanel } from "@mui/lab/";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import DonationCard from "../components/DonationCard";
import VolunteerCard from "../components/VolunteerCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import volunteer1 from "../public/images/volunteer1.jpg";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CarouselMain from "../components/CarouselMain";

import { getDonationMain, getVolunteerMain } from "../function/axios";

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

const theme = createTheme({
  typography: {
    // fontFamily: "Gowun Dodum",
    // fontFamily: "Noto Serif KR",
    fontFamily: "Noto Sans KR",
  },
  palette: {
    primary: {
      main: "#5B321E",
    },
  },
});

const Home: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<any>(0);
  const [option, setOption] = useState("");

  const [donationData, setDonationData] = useState<any>("");
  const [volunteerData, setVolunteerData] = useState<any>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const optionHandleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const params = {};

  useEffect(() => {
    getDonationMain(params).then((res) => {
      setDonationData(res.data.donation);
    });
    getVolunteerMain(params).then((res) => {
      setVolunteerData(res.data.listVolunteer);
    });
  }, []);

  return (
    <Container maxWidth="lg">
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
        <Stack alignItems="center">
          <Box
            sx={{
              // height: 100,
              width: 600,
              // bgcolor: "#f7f2ea",
            }}
          >
            <Typography
              textAlign="center"
              align="center"
              sx={{ fontSize: 30, mt: 2 }}
              fontWeight="bold"
            >
              최근에 올라온 후원과 봉사를 확인해 보세요!
            </Typography>
          </Box>
        </Stack>
        {/* test */}
        <Stack justifyContent="center" sx={{ mt: 3, mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ ml: 8 }}>
              후원
            </Typography>
            <Link href={"/donation"}>
              <Button>
                <ArrowCircleRightOutlinedIcon fontSize="large" />
              </Button>
            </Link>
          </Stack>
          <Stack>
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
              {donationData && donationData.length > 0 ? (
                donationData
                  .slice(0, 3)
                  .map((item, i) => <DonationCard donation={item} key={i} />)
              ) : (
                <Typography sx={{ margin: "200px 0" }}>
                  진행 중인 기부글이 없습니다.
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2, mt: 3 }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ ml: 8 }}>
              봉사
            </Typography>

            <Link href={"/donation?value=1"}>
              <Button>
                <ArrowCircleRightOutlinedIcon fontSize="large" />
              </Button>
            </Link>
          </Stack>
          <Stack>
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
              {volunteerData && volunteerData.length > 0 ? (
                volunteerData
                  .slice(0, 3)
                  .map((item, i) => <VolunteerCard volunteer={item} key={i} />)
              ) : (
                <Typography sx={{ margin: "200px 0" }}>
                  진행 중인 기부글이 없습니다.
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
        {/* <Stack>
          <Box sx={{ width: "100%", mt: 2 }}>
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <StyledTabs value={value} onChange={handleChange}>
                  <StyledTab
                    sx={{ fontWeight: "bold" }}
                    label="물품 기부"
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    sx={{ fontWeight: "bold" }}
                    label="봉사"
                    {...a11yProps(1)}
                  />
                </StyledTabs>
              </Stack>
              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 300px)",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: 5,
                    columnGap: 10,
                  }}
                >
                  {donationData && donationData.length > 0 ? (
                    donationData.map((item, i) => (
                      <DonationCard donation={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      진행 중인 기부글이 없습니다.
                    </Typography>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 300px)",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: 5,
                    columnGap: 10,
                  }}
                >
                  {volunteerData && volunteerData.length > 0 ? (
                    volunteerData.map((item, i) => (
                      <VolunteerCard volunteer={item} key={i} />
                    ))
                  ) : (
                    <Typography sx={{ margin: "200px 0" }}>
                      진행 중인 기부글이 없습니다.
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Stack> */}
      </Box>
    </Container>

    // <ThemeProvider theme={theme}>
    //   <Grid container justifyContent="center" alignItems="center">
    //     <Box textAlign="center" sx={{ mt: 5, mb: 10 }}>
    //       <Image
    //         src={volunteer1}
    //         alt="volunteer first"
    //         width={1200}
    //         height={200}
    //       />
    //     </Box>
    //     <Box>
    //       <TabContext value={value}>
    //         <Stack direction="row" justifyContent="space-between">
    //           <Tabs onChange={tabHandleChange}>
    //             <Tab label="물품" value="1" />
    //             <Tab label="봉사" value="2" />
    //           </Tabs>
    //           <Box
    //             sx={{
    //               minWidth: 200,
    //               display: "flex",
    //               justifyContent: "flex-end",
    //             }}
    //           >
    //             <FormControl fullWidth>
    //               <InputLabel>정렬</InputLabel>
    //               <Select
    //                 value={option}
    //                 label="option"
    //                 onChange={optionHandleChange}
    //               >
    //                 <MenuItem value="latest">최신순</MenuItem>
    //                 <MenuItem value="high">달성률 높은 순</MenuItem>
    //                 <MenuItem value="low">달성률 낮은 순</MenuItem>
    //                 <MenuItem value="endDate">종료일 순</MenuItem>
    //               </Select>
    //             </FormControl>
    //           </Box>
    //         </Stack>
    //         {/* <TabPanel value="1">
    //           <Box sx={{ mt: 3 }}>
    //             <Stack direction="row" spacing={5} sx={{ mb: 5 }}>
    //               <DonationCard />
    //               <DonationCard />
    //             </Stack>
    //             <Stack direction="row" spacing={5} sx={{ mb: 5 }}>
    //               <DonationCard />
    //               <DonationCard />
    //             </Stack>
    //             <Stack direction="row" spacing={5} sx={{ mb: 5 }}>
    //               <DonationCard />
    //               <DonationCard />
    //             </Stack>
    //           </Box>
    //         </TabPanel>
    //         <TabPanel value="2">
    //           <Box
    //             sx={{
    //               width: 1000,
    //               height: 300,
    //               backgroundColor: "#616161",
    //               mx: "auto",
    //               mt: 3,
    //             }}
    //           >
    //             <Typography variant="h3" sx={{ fontWeight: "bold" }}>
    //               {" "}
    //               지도
    //             </Typography>
    //           </Box>
    //           <Box sx={{ mt: 3 }}>
    //             <Stack direction="row" spacing={5} sx={{ mb: 5 }}>
    //               <VolunteerCard />
    //               <VolunteerCard />
    //             </Stack>
    //             <Stack direction="row" spacing={5} sx={{ mb: 5 }}>
    //               <VolunteerCard />
    //               <VolunteerCard />
    //             </Stack>
    //           </Box>
    //         </TabPanel> */}
    //       </TabContext>
    //     </Box>
    //     <Box>
    //       <Box
    //         sx={{
    //           width: 1200,
    //           height: 130,
    //           backgroundColor: "#FCE2A6",
    //           mx: 7,
    //           mt: 3,
    //           mb: 10,
    //         }}
    //       >
    //         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    //           <Stack>
    //             <Typography
    //               variant="h6"
    //               sx={{ fontWeight: "bold", mt: 3, mb: 2 }}
    //             >
    //               이달의 후원 참여 인원
    //             </Typography>
    //             {/* 인원 넣기 */}
    //             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
    //               이달의 봉사 참여 인원
    //             </Typography>
    //             {/* 인원 넣기 */}
    //           </Stack>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Grid>
    // </ThemeProvider>
  );
};

export default Home;
