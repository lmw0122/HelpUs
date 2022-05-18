import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CssBaseline,
  IconButton,
  Stack,
  Modal,
  TextField
} from "@mui/material";
import OrgMypageSidebar from "../../components/OrgMypageSidebar";
import Link from "next/link";
import helpImage from "../../public/images/help.png";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";

import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

import TestImage from "../../public/images/testImage.jpg";
import defaultImage from "../../public/images/defaultImage.png";

// api
import { getUserInfo, userEdit } from "function/axios";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFBC39" },
  },
  customColor: {
    backgroundColor: "#F8DD8E",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#FFBC39" },
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

const UpdateButton2 = styled(Button)({
  backgroundColor: "#CDAD78",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#5B321E",
    color: "white",
  },
  // width: "50px",
});


// 모달
const OutlinedButton = styled(Button)({
  border: "1px solid #5B321E",
  color: "#5B321E"
})

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius:'2%',
  boxShadow: 24,
  padding: 1,
  paddingLeft: 3,
  paddingRight: 3,
};
// 모달 끝


const OrgMypage: FC = () => {
  // const accessToken = localStorage.getItem("jwt");
  // console.log(accessToken);

  const [loading, setLoading] = useState<boolean>(false);

  const [myInfo, setMyInfo] = useState<any>(null);
  const params = {
    isDefault: null
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ORG_WAIT") {
      alert("승인 이후에 이용 가능합니다.");
      location.href = "/";
    }
    const token = localStorage.getItem("id");
    getUserInfo(token).then((res) => {
      setMyInfo(res.data);
      console.log(myInfo);
      setLoading(true);
    });
  }, []);


    // 모달
    const imageUpload = useRef(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setIntro(myInfo.info)
      setProfile('')
      setProfileName('')
      setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const [intro, setIntro] = useState('')
    const [profileName, setProfileName] = useState('')
    const [profile, setProfile] = useState('')
  
    // 파일 선택시
    const onImageChange = (e) => {
      if (e.target.files.length > 0){
          setProfileName(e.target.files[0].name)
          setProfile(e.target.files[0])
        }
      }
  
    // 업로드 버튼 클릭시
  const clickImageUpload = () => {
    params.isDefault = null;
    imageUpload.current.click();
    }
  const clickDefault = () => {
    params.isDefault = "true";
    setProfile('');
    setProfileName('');
  }
    // 수정 버튼 클릭시
    const clickEdit = () => {
      userEdit(localStorage.getItem('jwt'), myInfo.memberId, intro, profile, params)
      .then(res => {
        handleClose()
        location.reload()
      })
      .catch(err => console.log(err))
    }
  
    // 모달 끝


  return (
    <>
      {loading ? (
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
                      borderRadius: "20%",
                      overflow: "hidden",
                      marginTop: "6px",
                      // height: "300px",
                    }}
                  >
                    {myInfo.profile === null ? (
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
                    )}
                  </div>
                </Grid>
                <Grid item xs={8}>
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
                <Grid item xs={1}>
                  <UpdateButton onClick={handleOpen} variant="contained" sx={{ mb: 15 }}>
                    수정
                  </UpdateButton>
                </Grid>
              </Grid>
            </Container>
          </Box>


          {/* 회원수정 모달창 */}
            <div>
              <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight:'bold'}}>
                    회원정보 수정
                </Typography>


                <div style={{marginTop:'15px', marginBottom:'10px'}}>
                  <TextField
                    name="regi"
                    required
                    // fullWidth
                    id="regi"
                    label="프로필 사진"
                    value={profileName}
                    disabled={true}
                  />

                  <UpdateButton
                    sx={{ mt: 1, mb:1, mx:1}}
                    variant="contained"
                    onClick={clickImageUpload}
                  >
                  업로드
                  </UpdateButton>
                  <UpdateButton
                    sx={{ mt: 1, mb:1, mx:1}}
                    variant="contained"
                    onClick={clickDefault}
                  >
                  기본 이미지
                  </UpdateButton>
                  <input 
                    type="file" 
                    accept='image/*'
                    ref={imageUpload}
                    onChange={onImageChange}
                    style={{display:"none"}}
                  />
                </div>

                <TextField
                  name="intro"
                  fullWidth       
                  multiline
                  rows={3}
                  id="intro"
                  label="소개"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  inputProps={{ maxLength: 200 }}
                />

                <div style={{marginTop:'10px', display:'flex', justifyContent:'end'}}>
                    <UpdateButton 
                        style={{marginRight:'3px'}}
                        onClick={clickEdit}
                    >수정</UpdateButton>
                    <OutlinedButton
                        onClick={handleClose}
                    >취소</OutlinedButton>
                </div>
              </Box>
            </Modal>
          </div>
          {/* 회원수정 모달창 끝 */}



        </Box>
      ) : null}
    </>
  );
};

export default OrgMypage;
