import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

// api
import { createReview } from "../function/axios";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

interface IDnc {
  item: any;
}

const DonationCardOrgReview: FC<IDnc> = ({ item }) => {
  const onClickCreateReview = () => {
    window.location.href = `/create/review/${item.donationId}`;
  };
  const doTitle = item.title;

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
          backgroundColor: "#ffffff",
        }}
      >
        <Stack direction="row" justifyContent="center">
          <Box
            sx={{
              // display: "flex",
              justifyContent: "space-between",
              padding: "10px 15px",
              borderTop: "1px solide #CDAD78",
            }}
          >
            <Box>
              {doTitle.length > 18 ? (
                <Link href={`/detail/donationorg/${item.donationId}`}>
                  <a>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        mt: 0.5,
                        ml: 3.2,
                      }}
                    >
                      {doTitle.substring(0, 17)}...
                    </Typography>
                  </a>
                </Link>
              ) : (
                <Link href={`/detail/donationorg/${item.donationId}`}>
                  <a>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        mt: 0.5,
                        ml: 3.2,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </a>
                </Link>
              )}
              {/* <Link href={`/detail/donationorg/${item.donationId}`}>
                <a>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 17, mt: 0.5, ml: 3.2 }}
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
                {item.products.map((product, i) => (
                  <Grid sx={{ mx: 1.1, mt: 1 }} key={i}>
                    <Chip
                      label={product.productName}
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
                      {product.percent === 100 ? (
                        <Box
                          sx={{
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            width: `${product.percent}%`,
                            height: 5,
                            bgcolor: "#CDAD78",
                          }}
                        ></Box>
                      ) : (
                        <Box
                          sx={{
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            width: `${product.percent}%`,
                            height: 5,
                            bgcolor: "#CDAD78",
                          }}
                        ></Box>
                      )}
                      {product.percent === 0 ? (
                        <Box
                          sx={{
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            width: `${100 - product.percent}%`,
                            height: 5,
                            bgcolor: "#dbd5ca",
                          }}
                        ></Box>
                      ) : (
                        <Box
                          sx={{
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            width: `${100 - product.percent}%`,
                            height: 5,
                            bgcolor: "#dbd5ca",
                          }}
                        ></Box>
                      )}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              {/* 진행률 표시 바 */}
              <Stack
                sx={{
                  width: 280,
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
                      width: `${item?.percent}%`,
                      height: 15,
                      bgcolor: "#CDAD78",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: `${item?.percent}%`,
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
                      width: `${100 - item?.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      width: `${100 - item?.percent}%`,
                      height: 15,
                      bgcolor: "#dbd5ca",
                    }}
                  ></Box>
                )}
                <Typography align="center" sx={{ ml: 1, fontSize: 14 }}>
                  {parseInt(item?.percent)}%
                </Typography>
              </Stack>
            </Box>
            <Stack
              // justifyContent="space-between"
              direction="row"
              sx={{ mt: 1.5 }}
              alignItems="center"
            >
              <Typography sx={{ ml: 3.5 }}>종료일: {item.endDate}</Typography>
              <CustomButton
                variant="contained"
                size="small"
                sx={{ width: 75, ml: 5 }}
                onClick={onClickCreateReview}
              >
                후기 작성
              </CustomButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default DonationCardOrgReview;
