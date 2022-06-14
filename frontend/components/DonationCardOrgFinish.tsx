import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { AnyStyledComponent } from "styled-components";
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

interface IDonationCardOrgFinish {
  item: AnyStyledComponent;
}

const DonationCardOrgFinish: FC<IDonationCardOrgFinish> = ({ item }) => {
  const router = useRouter();
  const [hover, setHover] = useState<any>({ cursor: "pointer" });
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
        style={hover}
        onMouseOver={() =>
          setHover({
            transform: "translateY(-5px)",
            boxShadow: "0 0 15px #CDAD78",
            cursor: "pointer",
          })
        }
        onMouseOut={() => setHover({ cursor: "pointer" })}
        onClick={() => router.push(`/detail/donationorg/${item.donationId}`)}
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
              {/* 제목은 17자까지만 보여주기??*/}
              {doTitle.length > 18 ? (
                <Link href={`/detail/donationorg/${item.donationId}`}>
                  <a>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        mt: 0.5,
                        ml: 3.5,
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
                        ml: 3.5,
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
                {item.products?.map((item, i) => (
                  <Grid key={i} sx={{ mx: 1.1, mt: 1 }}>
                    <Chip
                      label={item.productName}
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
                      {item.percent === 100 ? (
                        <Box
                          sx={{
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            width: `${item.percent}%`,
                            height: 5,
                            bgcolor: "#CDAD78",
                          }}
                        ></Box>
                      ) : (
                        <Box
                          sx={{
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            width: `${item.percent}%`,
                            height: 5,
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
                            height: 5,
                            bgcolor: "#dbd5ca",
                          }}
                        ></Box>
                      ) : (
                        <Box
                          sx={{
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            width: `${100 - item.percent}%`,
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
            <Stack direction="row" sx={{ mt: 1.5 }} justifyContent="center">
              <Typography>종료일: {item.endDate}</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default DonationCardOrgFinish;
