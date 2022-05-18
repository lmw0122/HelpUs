import { styled } from "@mui/material/styles";
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
  FormControl,
  Select,
  TextField,
  InputLabel,
  MenuItem,
  Modal,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { getPostCompany, sendApply } from "../function/axios";

interface IPostInfo {
  // company: any;
  // companyName: string;
  // postNum: any;
  donationApplyId: number;
  memberId: number;
  getStatus: any;
  postStatus: any;
}

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const CustomButton3 = styled(Button)({
  // backgroundColor: "#5B321E",
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

const CssAutocomplete = styled(Autocomplete)({
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

const PostInfo: FC<IPostInfo> = ({
  donationApplyId,
  memberId,
  getStatus,
  postStatus,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 택배사 리스트 api
  const [companyList, setCompanyList] = useState<any[]>([]);

  // 송장 정보 입력 - 택배사, 송장 번호
  const [company, setCompany] = useState<any>("");
  const [companyName, setCompanyName] = useState<any>("");
  const [postNum, setPostNum] = useState<any>("");

  const filterOptions = createFilterOptions({
    stringify: ({ Name }) => `${Name}`,
  });

  const getCompany = (event: React.ChangeEvent<HTMLInputElement>, value) => {
    setCompany(value.Code);
    setCompanyName(value.Name);
    // console.log("선택된", company);
  };

  const getPostNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostNum(event.target.value);
  };

  useEffect(() => {
    const userId = localStorage.getItem("id");
    getPostCompany().then((res) => {
      setCompanyList(res.data.Company);
    });
    setLoading(true);
  }, []);

  const onClickSendApply = () => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const data = {
      donationApplyId: donationApplyId,
      memberId: parseInt(userId),
      invoice: postNum,
      parcel: company.toString(),
    };
    sendApply(userId, token, data)
      .then((res) => {
        console.log("송장 입력 성공");
        getStatus(!postStatus);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // {
  //     "donationApplyId":2,
  //     "memberId":1,
  //     "invoice":123,
  //     "parcel": "CJ대한통운"
  // }

  return (
    <>
      {loading ? (
        <Stack direction="row">
          <Stack alignItems="center">
            <CssAutocomplete
              onChange={getCompany}
              sx={{
                backgroundColor: "#ffffff",
                width: 150,
                m: 1,
              }}
              freeSolo
              disableClearable
              options={companyList}
              getOptionLabel={(option) => option["Name"]}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <CssTextField
                  {...params}
                  label="택배사"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            <CssTextField
              onChange={getPostNum}
              sx={{ backgroundColor: "#ffffff", width: 150 }}
              size="small"
              label="송장 번호"
              type="search"
              id="outlined-search"
            />
          </Stack>
          <Stack justifyContent="center">
            {company === "" || postNum === "" ? (
              <CustomButton3 disabled>입력</CustomButton3>
            ) : (
              <CustomButton onClick={handleOpen}>입력</CustomButton>
            )}
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                  송장 입력 확인
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mt: 2 }}
                  spacing={2}
                >
                  <Typography sx={{ fontSize: 20 }} fontWeight="bold">
                    택배사
                  </Typography>
                  <Typography>{companyName}</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mt: 2 }}
                  spacing={2}
                >
                  <Typography sx={{ fontSize: 20 }} fontWeight="bold">
                    송장 번호
                  </Typography>
                  <Typography>{postNum}</Typography>
                </Stack>
                <Typography sx={{ fontSize: 18, mt: 2 }} textAlign="center">
                  입력 값이 확실합니까?
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={5}
                  sx={{ mt: 2 }}
                >
                  <CustomButton2 onClick={handleClose} sx={{ width: 100 }}>
                    취소
                  </CustomButton2>
                  <CustomButton onClick={onClickSendApply} sx={{ width: 100 }}>
                    확인
                  </CustomButton>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default PostInfo;
