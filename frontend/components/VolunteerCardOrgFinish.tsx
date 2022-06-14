import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const VolunteerCardOrgFinish: FC = () => {
  return (
    <div>
      <Box
        sx={{
          borderRadius: "10px",
          boxShadow: "0 0 5px #CDAD78",
          overflow: "hidden",
          position: "relative",
          height: 230,
          width: 500,
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              borderRadius: "20px 20px 0 0",
              // display: "flex",
              height: 230,
              width: "35%",
            }}
          >
            <Image
              width="100%"
              height="145"
              src={TestImage}
              alt="Donation Image"
              layout="responsive"
            />
          </Box>
          <Box
            sx={{
              // display: "flex",
              justifyContent: "space-between",
              padding: "10px 15px",
              borderTop: "1px solide #CDAD78",
              height: "100%",
              width: "65%",
              bgcolor: "#ffffff",
            }}
          >
            <Box>
              {/* 제목은 17자까지만 보여주기??*/}
              <Typography sx={{ fontWeight: "bold", fontSize: 17, mt: 0.5 }}>
                대청소 봉사 인원을 모집합니다.
              </Typography>

              <Grid
                container
                sx={{
                  ml: 1,
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
                  <PersonIcon sx={{ mr: 2 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    4 / 10
                  </Typography>
                </Grid>
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  direction="row"
                  alignItems="center"
                >
                  <CalendarMonthIcon sx={{ mr: 2 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    2022-05-20
                  </Typography>
                </Grid>
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  direction="row"
                  // alignItems="center"
                >
                  <LocationOnIcon sx={{ mr: 2 }} />
                  <Typography align="left" sx={{ fontSize: 14, width: 200 }}>
                    경기도 수원시 팔달구 중부대로 222번길 22 2-22
                  </Typography>
                </Grid>
                {/* <Typography sx={{ fontSize: 14, m: 0.5 }}>
                  경기도 수원시 영통구 센트럴타운로 22 (이의동)
                </Typography> */}
              </Grid>
              {/* 진행률 표시 바 */}
              <Stack
                sx={{
                  width: 300,
                  height: 10,
                  mt: 1.5,
                }}
                direction="row"
                alignItems="center"
              >
                <Box
                  sx={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    width: "40%",
                    height: 15,
                    bgcolor: "#CDAD78",
                  }}
                ></Box>
                <Box
                  sx={{
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    width: "60%",
                    height: 15,
                    bgcolor: "#dbd5ca",
                  }}
                ></Box>
                <Typography align="center" sx={{ ml: 1, fontSize: 14 }}>
                  40%
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row" sx={{ mt: 1.5 }} justifyContent="center">
              <Typography>종료일: 2022-05-20</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default VolunteerCardOrgFinish;
