import { FC, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  IconButton,
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
  Divider,
  TextField,
  Tooltip,
  FormGroup,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import CustomCarousel from "@/components/Carousel";
// import defaultImage from "../../public/images/defaultImage.png";
import defaultImage from "../../../public/images/defaultImage.png";

import Link from "next/link";
import helpImage from "../../public/images/help.png";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

import testImage from "../../../public/images/testImage.jpg";
import goodImage from "../../../public/images/good.jpg";

import Comment from "../../../components/Comment";

import { useRouter } from "next/router";
import { getTalentDonationDetail, getUserInfo } from "function/axios";
// import { CommentData } from "../../../interfaces";

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

const CustomButton3 = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  outline: "none",
});

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


export interface CommentData {
  commentId: number;
  memberId: number;
  name: string;
  profile: string;
  content: string;
  parentId: number;
  parentName: string;
  createDate: any;
}

const TalentDetail: FC = () => {
  //const imageList = [testImage, testImage, testImage, testImage, testImage];
  
  const router = useRouter();

  const [loading, setLoadging] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  // console.log("라우터 쿼리는", router.query.id);

  const [talentDonationDetail, setTalentDonationDetail] = useState<any>("");
  const [userInfo, setUserInfo] = useState<any>("");
  useEffect(() => {
    if (router.isReady) {
      getTalentDonationDetail(router.query.id).then((res) => {
        setTalentDonationDetail(res.data.volunteer);
        setLoading2(true)
      });
      getUserInfo(localStorage.getItem("id")).then((res) => {
        console.log(res.data.profile === null);
        setUserInfo(res.data);
        setLoadging(true)
      });
    }
  }, [router.isReady]);

  return (
    <>
    {loading && loading2 ? (

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
          <Grid container>
            <Grid sx={{ mr: 2 }}>
              <div
                style={{
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginTop: "6px",
                }}
              >
                {userInfo.profile === null ? (
                  <Image
                    src={defaultImage}
                    alt="orgImage"
                    width="300px"
                    height="300px"
                  />
                ) : (
                  <Image
                    src={userInfo.profile}
                    // src={defaultImage}
                    alt="orgImage"
                    width="300px"
                    height="300px"
                  />
                )}
              </div>
            </Grid>
            <Grid>
              <Typography sx={{ mt: 2.5 }} variant="h6" fontWeight="bold">
                {userInfo.name}
              </Typography>
              <Grid
                sx={{ mt: 2 }}
                container
                direction="row"
                alignItems="center"
              >
                <MailIcon sx={{ mr: 1 }} />
                <Typography align="center">{userInfo.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ mt: 1.5, mb: 3 }}
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
            {talentDonationDetail.title}
            </Typography>
            <CustomButton variant="contained" size="small" sx={{ width: 30 }} onClick={() => history.back()}>
              목록
            </CustomButton>
          </Stack>
          {/* 게시글 이미지 */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 0, mr: 5 }}
            >
              <CustomCarousel item={talentDonationDetail?.images} />
            </Stack>
            <Stack>
              <Box
                sx={{
                  my: "auto",
                  bgcolor: "#f5e1be",
                  borderRadius: 1.25,
                  // height: "120px",
                }}
                height="470px"
                width="500px"
              >
                <Typography sx={{ p: 2, mt: 0 }}>
                  {talentDonationDetail?.content}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Typography
            sx={{ mt: 2 }}
            variant="h6"
            fontWeight="bold"
            textAlign="right"
          >
            작성일 {talentDonationDetail.createDate}
          </Typography>
            {talentDonationDetail.updateDate === null ? null : (
              <Typography
                sx={{ mt: 2 }}
                variant="h6"
                fontWeight="bold"
                textAlign="right"
              >
                수정일 {talentDonationDetail.updateDate}
              </Typography>
            )}
          <Divider color="#CDAD78" sx={{ my: 2, borderBottomWidth: 5 }} />
          <Typography variant="h5" fontWeight="bold" sx={{ mx: 5 }}>
            댓글 
          </Typography>
          <Stack
            justifyContent="space-between"
            direction="row"
            sx={{ mt: 1.5, mb: 3, mx: 5 }}
            alignItems="center"
          >
            <CssTextField
              sx={{ backgroundColor: "#ffffff", width: 1000 }}
              size="small"
            />
            <CustomButton variant="contained" size="small" sx={{ width: 30 }}>
              등록
            </CustomButton>
          </Stack>
          {/* <Stack>
            {comments.map((item) => (
              <Comment comment={item} />
            ))}
          </Stack> */}
        </Container>
      </Box>
    </Box>
    ) : null}
    </>
  );
};

export default TalentDetail;
