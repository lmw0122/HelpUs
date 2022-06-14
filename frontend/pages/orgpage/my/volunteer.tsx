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
import helpImage from "../../../public/images/help.png";

import Pagination from "@/components/Pagination";

import VolunteerCard from "@/components/VolunteerCard";
import VolunteerCardOrg from "../../../components/VolunteerCardOrg";
import VolunteerCardOrgFinish from "@/components/VolunteerCardOrgFinish";

// api
import { getVolunteerOrg } from "../../../function/axios";

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

const orgpageMyVolunteer: FC = () => {
  const [value, setValue] = useState(0);

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

  const [mId, setMID] = useState<any>("");
  const [userToken, setUserToken] = useState<any>("");

  const [fStatus, setFStatus] = useState<boolean>(false);

  const getStatus = (fStatus) => {
    setFStatus(fStatus);
  };

  useEffect(() => {
    setMID(localStorage.getItem("id"));
    setUserToken(localStorage.getItem("jwt"));
    const memberId = localStorage.getItem("id");
    const params = {
      page: curPage,
      status: 0,
    };

    const params2 = {
      page: curPage2,
      status: 1,
    };

    getVolunteerOrg(memberId, params).then((res) => {
      setIngVolunteer(res.data.listVolunteer);
      setTotalPages(res.data.totalPage);
    });

    getVolunteerOrg(memberId, params2).then((res) => {
      setDoneVolunteer(res.data.listVolunteer);
      setTotalPages2(res.data.totalPage);
    });
  }, [fStatus, curPage, curPage2]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <OrgMypageSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "85vh",
          overflow: "auto",
          mt: 0,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">봉사 모집 게시글</Typography>
            <CustomButton href="/create/volunteer">글 작성</CustomButton>
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
                    label="진행 중인 글"
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    sx={{ fontWeight: "bold" }}
                    label="마감 된 글"
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
                    {ingVolunteer && ingVolunteer.length > 0 ? (
                      ingVolunteer.map((item, i) => (
                        <VolunteerCardOrg
                          key={i}
                          item={item}
                          token={userToken}
                          id={mId}
                          getStatus={getStatus}
                          fStatus={fStatus}
                        />
                      ))
                    ) : (
                      <Typography>모집 중인 봉사가 없습니다.</Typography>
                    )}
                  </Box>
                  {ingVolunteer && ingVolunteer.length > 0 ? (
                    <Stack alignItems="center" sx={{ mb: 0, mt: 3 }}>
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
                      gridTemplateColumns: "repeat(auto-fill, 300px)",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: 5,
                      columnGap: 7,
                    }}
                  >
                    {doneVolunteer && doneVolunteer.length > 0 ? (
                      doneVolunteer.map((item, i) => (
                        <VolunteerCard
                          key={i}
                          volunteer={item}
                          // token={userToken}
                          // id={mId}
                          // getStatus={getStatus}
                          // fStatus={fStatus}
                        />
                      ))
                    ) : (
                      <Typography>마감된 봉사가 없습니다.</Typography>
                    )}
                  </Box>
                  {ingVolunteer && ingVolunteer.length > 0 ? (
                    <Stack alignItems="center" sx={{ mb: 0, mt: 3 }}>
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
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default orgpageMyVolunteer;
