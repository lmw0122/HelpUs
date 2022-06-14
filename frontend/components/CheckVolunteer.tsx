import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
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
  Modal,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { FC, useState, useEffect } from "react";

// api
import { endInquiry } from "function/axios";

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

interface ICheckVolunteer {
  fact: any;
  token: any;
  id: any;
  userId: any;
  getData: any;
  volStatus: boolean;
}

const CheckVolunteer: FC<ICheckVolunteer> = ({
  userId,
  fact,
  token,
  id,
  getData,
  volStatus,
}) => {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 모달2
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const onClickSubmit1 = () => {
    const status = 1;
    endInquiry(userId, token, id, status)
      .then((res) => {
        // console.log("봉사 상태 변경 성공");
        getData(!volStatus);
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const onClickSubmit2 = () => {
    const status = 2;
    endInquiry(userId, token, id, status)
      .then((res) => {
        // console.log("봉사 상태 변경 성공");
        getData(!volStatus);
        setOpen2(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {fact === 0 ? (
        <>
          <CustomButton
            onClick={handleOpen}
            sx={{ width: 40, height: 30, mr: 2 }}
          >
            참석
          </CustomButton>
          <CustomButton2 onClick={handleOpen2} sx={{ width: 40, height: 30 }}>
            불참
          </CustomButton2>
        </>
      ) : null}
      {fact === 1 ? <Typography>참석</Typography> : null}
      {fact === 2 ? <Typography>불참</Typography> : null}
      {/* 모달창 */}
      <Stack justifyContent="center">
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Stack justifyContent="center" alignItems="center">
              <Typography textAlign="center" sx={{ mb: 1 }} fontWeight="bold">
                참석으로 변경하시겠습니까?
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                <CustomButton2 onClick={handleClose}>취소</CustomButton2>
                <CustomButton onClick={onClickSubmit1}>확인</CustomButton>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Stack>
      {/* 모달창 */}
      <Stack justifyContent="center">
        <Modal open={open2} onClose={handleClose2}>
          <Box sx={style}>
            <Stack justifyContent="center" alignItems="center">
              <Typography textAlign="center" sx={{ mb: 1 }} fontWeight="bold">
                불참으로 변경하시겠습니까?
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                <CustomButton2 onClick={handleClose2}>취소</CustomButton2>
                <CustomButton onClick={onClickSubmit2}>확인</CustomButton>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </>
  );
};

export default CheckVolunteer;
