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
  List,
} from "@mui/material";

import DonationCardOrg from "@/components/DonationCardOrg";
import DonationCardOrgFinish from "@/components/DonationCardOrgFinish";
import Pagination from "@/components/Pagination";
// api
import { getDonationList } from "../../../function/axios";

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

const orgpageMyDonation: FC = () => {
  const [rendering, setRendering] = useState<boolean>(false);
  // tab 부분
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // pagination1
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);

  // pagination2
  const [curPage2, setCurPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(0);
  const paginate2 = (pageNumber) => setCurPage(pageNumber);

  const [mId, setMID] = useState<any>("");
  const [userToken, setUserToken] = useState<any>("");

  const [fStatus, setFStatus] = useState<boolean>(false);

  const getStatus = (fStatus) => {
    setFStatus(fStatus);
  };

  // 진행 중인
  const [ingDonation, setIngDonation] = useState<any>("");
  // 마감 된
  const [doneDonation, setDoneDonation] = useState<any>("");

  useEffect(() => {
    setRendering(true);
    setMID(localStorage.getItem("id"));
    setUserToken(localStorage.getItem("jwt"));
    const memberId = localStorage.getItem("id");
    const ingParams = {
      memberId: memberId,
      donationStatus: "진행",
      page: curPage,
    };
    const doneParams = {
      memberId: memberId,
      donationStatus: "마감",
      page: curPage2,
    };
    getDonationList(ingParams).then((res) => {
      // setIngDonation(res.data.donation);
      // console.log(res.)
      setTotalPages(res.data.totalPage);
    });
    getDonationList(doneParams).then((res) => {
      setDoneDonation(res.data.donation);
      console.log(res.data.totalPage);
      setTotalPages2(res.data.totalPage);
    });
  }, [fStatus]);

  return (
    <>
      {rendering ? (
        <div>
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
                  <Typography variant="h4">물품 후원 게시글</Typography>
                  <CustomButton href="create/donation">글 작성</CustomButton>
                </Stack>
                {/* Tab 시작 */}
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Box sx={{ bgcolor: "#FCF8F0", borderRadius: 1.25 }}>
                    <StyledTabs
                      value={value}
                      onChange={handleChange}
                      aria-label="styled tabs example"
                    >
                      <StyledTab
                        sx={{ fontWeight: "bold" }}
                        label="진행 중인 글"
                        {...a11yProps(0)}
                      />
                      <StyledTab
                        sx={{ fontWeight: "bold" }}
                        label="마감 된 글"
                        {...a11yProps(1)}
                      />
                    </StyledTabs>
                    {/* <Box sx={{ p: 3 }} /> */}
                    <TabPanel value={value} index={0}>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, 500px)",
                          justifyContent: "center",
                          alignItems: "center",
                          // marginTop: 5,
                          rowGap: 1,
                          columnGap: 5,
                        }}
                      >
                        {ingDonation && ingDonation.length > 0 ? (
                          ingDonation.map((item, i) => (
                            <DonationCardOrg
                              key={i}
                              item={item}
                              token={userToken}
                              id={mId}
                              getStatus={getStatus}
                              fStatus={fStatus}
                            />
                          ))
                        ) : (
                          <Typography>진행 중인 기부가 없습니다.</Typography>
                        )}
                      </Box>
                      {ingDonation && ingDonation.length > 0 ? (
                      <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
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
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, 500px)",
                          justifyContent: "center",
                          alignItems: "center",
                          rowGap: 1,
                          columnGap: 5,
                        }}
                      >
                        {doneDonation && doneDonation.length > 0 ? (
                          doneDonation.map((item, i) => (
                            <DonationCardOrgFinish key={i} item={item} />
                          ))
                        ) : (
                          <Typography>마감된 기부가 없습니다.</Typography>
                        )}
                      </Box>
                      {doneDonation && doneDonation.length > 0 ? (
                      <Stack alignItems="center" sx={{ mb: 2, mt: 2 }}>
                        <Pagination
                          curPage={curPage2}
                          paginate={paginate2}
                          totalPage={totalPages2}
                        />
                        </Stack>
                      ) : (
                          <></>
                        )}
                    </TabPanel>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        </div>
      ) : null}
    </>
  );
};

export default orgpageMyDonation;
