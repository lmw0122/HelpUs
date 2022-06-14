import { Box, Button, Stack, Typography, Grid, Modal } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useRouter } from "next/router";

//api
import { finishVolunteer } from "../function/axios";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

interface IVC {
  item: any;
  token: any;
  id: any;
  getStatus: any;
  fStatus: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#e9e1d3",
  // border: "2px solid #000",
  borderRadius: 2,
  // boxShadow: 24,
  p: 2,
};

const CustomButton2 = styled(Button)({
  color: "#5B321E",
  border: "2px solid #5B321E",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FCE2A6",
    color: "#5B321E",
  },
  fontSize: 12,
});

const VolunteerCardOrg: FC<IVC> = ({ item, token, id, getStatus, fStatus }) => {
  const volDate = "" + item.volDate;
  const volTitle = "" + item.title;
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 기부 마감 버튼
  const onClickFinishVolunteer = () => {
    finishVolunteer(item.volunteerId, token, id)
      .then((res) => {
        // console.log("기부 마감 성공");
        getStatus(!fStatus);
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Box
        sx={{
          borderRadius: "10px",
          boxShadow: "0 0 5px #CDAD78",
          overflow: "hidden",
          position: "relative",
          height: 230,
          width: 325,
        }}
      >
        <Stack direction="row" justifyContent="center">
          <Box
            sx={{
              // display: "flex",
              justifyContent: "space-between",
              padding: "10px 15px",
              borderTop: "1px solide #CDAD78",
              bgcolor: "#ffffff",
            }}
          >
            <Box>
              {volTitle.length > 18 ? (
                <Link href={`/detail/volunteer/${item.volunteerId}`}>
                  <a>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        mt: 0.5,
                        ml: 3.5,
                      }}
                    >
                      {volTitle.substring(0, 17)}...
                    </Typography>
                  </a>
                </Link>
              ) : (
                <Link href={`/detail/volunteer/${item.volunteerId}`}>
                  <a>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        mt: 0.5,
                        ml: 3.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </a>
                </Link>
              )}
              {/* <Link href={`/detail/volunteer/${item.volunteerId}`}>
                <a>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 17, mt: 0.5, ml: 3.5 }}
                  >
                    {item.title}
                  </Typography>
                </a>
              </Link> */}
              <Grid
                container
                sx={{
                  mx: "auto",
                  mt: 1,
                  bgcolor: "#f7f2ea",
                  width: 250,
                  height: 110,
                  borderRadius: 1.25,
                }}
                direction="row"
              >
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  direction="row"
                  alignItems="center"
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    {item.applicant} / {item.people}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  direction="row"
                  alignItems="center"
                >
                  <CalendarMonthIcon sx={{ mr: 1 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    {volDate.substr(0, 10)}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  direction="row"
                  // alignItems="center"
                >
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    {item.volAddress}
                  </Typography>
                </Grid>
              </Grid>
              {/* 진행률 표시 바 */}
              <Stack
                sx={{
                  width: 270,
                  height: 10,
                  mt: 1.5,
                  ml: 3.5,
                }}
                direction="row"
                alignItems="center"
              >
                {item.percent === 100 ? (
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: `${item.percent}%`,
                      height: 15,
                      bgcolor: "#CDAD78",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: `${item.percent}%`,
                      height: 15,
                      bgcolor: "#CDAD78",
                    }}
                  ></Box>
                )}
                {item.percent === 0 ? (
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: `${100 - item.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: `${100 - item.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                )}
                <Typography align="center" sx={{ ml: 1, fontSize: 14 }}>
                  {parseInt(item.percent)}%
                </Typography>
              </Stack>
            </Box>
            <Stack
              justifyContent="center"
              direction="row"
              sx={{ mt: 1.5 }}
              alignItems="center"
            >
              {/* <Typography>자동 종료일: 2022-05-20</Typography> */}
              <CustomButton
                onClick={handleOpen}
                variant="contained"
                size="small"
                sx={{ width: 80 }}
              >
                마감
              </CustomButton>
            </Stack>
            {/* 모달창 */}
            <Stack justifyContent="center">
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Stack justifyContent="center" alignItems="center">
                    <Typography
                      textAlign="center"
                      sx={{ mb: 1 }}
                      fontWeight="bold"
                    >
                      해당 기부를 종료하시겠습니까?
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                      <CustomButton2 onClick={handleClose}>취소</CustomButton2>
                      <CustomButton onClick={onClickFinishVolunteer}>
                        확인
                      </CustomButton>
                    </Stack>
                  </Stack>
                </Box>
              </Modal>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default VolunteerCardOrg;
