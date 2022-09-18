import { Box, Button, Stack, Typography, Grid, Modal } from "@mui/material";
import Image from "next/image";
import react, { FC, useState } from "react";
import TestImage from "../public/images/testImage.jpg";
import defaultImage from "../public/images/defaultImage.png";
import Chip from "@mui/material/Chip";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

// api
import { finishDonation } from "../function/axios";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

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

interface IDonationCardOrg {
  item: any;
  token: any;
  id: any;
  getStatus: any;
  fStatus: boolean;
}

const DonationCardOrg: FC<IDonationCardOrg> = ({
  item,
  token,
  id,
  getStatus,
  fStatus,
}) => {
  const doTitle = item.title;
  const router = useRouter();

  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickFinish = () => {
    finishDonation(item.donationId, id, token)
      .then((res) => {
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
              <Typography sx={{ ml: 3.5 }}>
                자동 종료일: {item.endDate}
              </Typography>
              <CustomButton
                onClick={handleOpen}
                variant="contained"
                size="small"
                sx={{ width: 30, ml: 2.5 }}
              >
                종료
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
                      <CustomButton onClick={onClickFinish}>확인</CustomButton>
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

export default DonationCardOrg;
