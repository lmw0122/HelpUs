import { Box, Button, Stack, Typography, Grid } from "@mui/material";
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

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

interface IVolunteer {
  volunteer: any;
}

const VolunteerCard: FC<IVolunteer> = ({ volunteer }) => {
  const volDate = "" + volunteer.volDate;
  const volTitle = "" + volunteer.title;
  const router = useRouter();
  const [hover, setHover] = useState<any>({cursor:'pointer'})

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
        style={hover}
        onMouseOver={() => setHover({transform: 'translateY(-5px)',boxShadow:'0 0 15px #CDAD78', cursor:'pointer'})}
        onMouseOut={() => setHover({cursor:'pointer'})}
        onClick={() => router.push(`/detail/volunteer/${volunteer.volunteerId}`)}
      >
        <Stack direction="row" justifyContent="center">
          <Box
            sx={{
              // display: "flex",
              justifyContent: "space-between",
              padding: "10px 15px",
              borderTop: "1px solide #CDAD78",
              // height: "100%",
              // width: "65%",
              bgcolor: "#ffffff",
            }}
          >
            <Box>
              {/* 제목은 17자까지만 보여주기??*/}
              {/* <Link href={`/detail/volunteer/${volunteer.volunteerId}`}>
                <a> */}
                  {volTitle.length > 18 ? (
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 17, mt: 0.5, ml: 3 }}
                    >
                      {volTitle.substring(0, 17)}...
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 17, mt: 0.5, ml: 3 }}
                    >
                      {volTitle}
                    </Typography>
                  )}
                {/* </a>
              </Link> */}

              <Grid
                container
                sx={{
                  // ml: 1,
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
                    {volunteer.applicant} / {volunteer.people}
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
                    {volDate.substring(0, 10)}
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
                    {volunteer.volAddress}
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
                justifyContent="space-between"
              >
                {volunteer.percent === 100 ? (
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: `${volunteer.percent}%`,
                      height: 15,
                      bgcolor: "#CDAD78",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: `${volunteer.percent}%`,
                      height: 15,
                      bgcolor: "#CDAD78",
                    }}
                  ></Box>
                )}
                {volunteer.percent === 0 ? (
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: `${100 - volunteer.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: `${100 - volunteer.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                )}
                <Typography align="center" sx={{ ml: 1, fontSize: 14 }}>
                  {parseInt(volunteer.percent)}%
                </Typography>
              </Stack>
            </Box>
            <Stack
              // justifyContent="space-between"
              direction="row"
              sx={{ mt: 1.5 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography align="center">{volunteer.name}</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default VolunteerCard;
