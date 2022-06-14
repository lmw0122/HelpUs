import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const ReviewCard: FC = () => {
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
                기부 후기입니다.
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
                <Grid sx={{ mx: 1.1, mt: 1 }}>
                  <Chip
                    label="두부"
                    size="small"
                    sx={{
                      backgroundColor: "#FCE2A6",
                      width: 65,
                      fontSize: 11,
                    }}
                  />
                  <Stack
                    sx={{
                      width: 65,
                      height: 10,
                    }}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: "40%",
                        height: 5,
                        bgcolor: "#CDAD78",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: "60%",
                        height: 5,
                        bgcolor: "#dbd5ca",
                      }}
                    ></Box>
                  </Stack>
                </Grid>
                <Grid sx={{ mx: 1.1, mt: 1 }}>
                  <Chip
                    label="두부"
                    size="small"
                    sx={{
                      backgroundColor: "#FCE2A6",
                      width: 65,
                      fontSize: 11,
                    }}
                  />
                  <Stack
                    sx={{
                      width: 65,
                      height: 10,
                    }}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: "40%",
                        height: 5,
                        bgcolor: "#CDAD78",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: "60%",
                        height: 5,
                        bgcolor: "#dbd5ca",
                      }}
                    ></Box>
                  </Stack>
                </Grid>
                <Grid sx={{ mx: 1.1, mt: 1 }}>
                  <Chip
                    label="두부"
                    size="small"
                    sx={{
                      backgroundColor: "#FCE2A6",
                      width: 65,
                      fontSize: 11,
                    }}
                  />
                  <Stack
                    sx={{
                      width: 65,
                      height: 10,
                    }}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: "40%",
                        height: 5,
                        bgcolor: "#CDAD78",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: "60%",
                        height: 5,
                        bgcolor: "#dbd5ca",
                      }}
                    ></Box>
                  </Stack>
                </Grid>
                <Grid sx={{ mx: 1.1, mt: 1 }}>
                  <Chip
                    label="두부"
                    size="small"
                    sx={{
                      backgroundColor: "#FCE2A6",
                      width: 65,
                      fontSize: 11,
                    }}
                  />
                  <Stack
                    sx={{
                      width: 65,
                      height: 10,
                    }}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: "40%",
                        height: 5,
                        bgcolor: "#CDAD78",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: "60%",
                        height: 5,
                        bgcolor: "#dbd5ca",
                      }}
                    ></Box>
                  </Stack>
                </Grid>
                <Grid sx={{ mx: 1.1, mt: 1 }}>
                  <Chip
                    label="두부"
                    size="small"
                    sx={{
                      backgroundColor: "#FCE2A6",
                      width: 65,
                      fontSize: 11,
                    }}
                  />
                  <Stack
                    sx={{
                      width: 65,
                      height: 10,
                    }}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: "40%",
                        height: 5,
                        bgcolor: "#CDAD78",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: "60%",
                        height: 5,
                        bgcolor: "#dbd5ca",
                      }}
                    ></Box>
                  </Stack>
                </Grid>
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
            <Stack
              // justifyContent="space-between"
              direction="row"
              sx={{ mt: 1.5 }}
              alignItems="center"
              justifyContent="center"
            >
              <Typography align="center">수원시광교노인복지관</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default ReviewCard;
