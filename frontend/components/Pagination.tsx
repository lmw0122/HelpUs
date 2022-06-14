import { FC, useEffect, useState } from "react";
import {
  Grid,
  IconButton,
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
  Divider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface IPagination {
  paginate: any;
  curPage: number;
  totalPage: number;
}

const ArrowButton = styled(Button)({
  // backgroundColor: "#5B321E",
  // color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FCE2A6",
    color: "white",
  },
  // width: "30px",
  // borderRadius: 50,
});

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
  width: "30px",
  borderRadius: 50,
});

const CustomButton2 = styled(Button)({
  color: "#5B321E",
  // border: "2px solid #5B321E",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FCE2A6",
    color: "#5B321E",
  },
  width: "30px",
  borderRadius: 50,
});

const Pagination: FC<IPagination> = ({ paginate, curPage, totalPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  const goPrevPage = () => {
    if (curPage !== 1){
      paginate(curPage - 1);
    }
  };

  const goNextPage = () => {
    if (curPage !== totalPage){
      paginate(curPage + 1);
    }
  };

  useEffect(() => {
    const numArr = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        numArr.push(i);
      }
    } else if (curPage < 3) {
      for (let i = 1; i <= 5; i++) {
        numArr.push(i);
      }
    } else if (curPage > totalPage - 3) {
      for (let i = totalPage - 4; i <= totalPage; i++) {
        numArr.push(i);
      }
    } else {
      for (let i = curPage - 2; i < curPage + 3; i++) {
        numArr.push(i);
      }
    }
    setPageNumbers(numArr);
  }, [totalPage, curPage]);

  return (
    <>
      <Stack direction="row" alignItems="center">
        <ArrowButton onClick={() => paginate(1)}>
          <KeyboardDoubleArrowLeftIcon
            sx={{
              color: "#5B321E",
            }}
          />
        </ArrowButton>
        <ArrowButton onClick={goPrevPage}>
          <ArrowBackIosNewIcon
            sx={{
              color: "#5B321E",
            }}
          />
        </ArrowButton>

        {pageNumbers.map((number, idx) =>
          number === curPage ? (
            <CustomButton
              variant="contained"
              onClick={() => paginate(number)}
              size="small"
              key={idx}
            >
              {number}
            </CustomButton>
          ) : (
            <CustomButton2 onClick={() => paginate(number)} size="small" key={idx}>
              {number}
            </CustomButton2>
          )
        )}

        <ArrowButton onClick={goNextPage}>
          <ArrowForwardIosIcon
            sx={{
              color: "#5B321E",
            }}
          />
        </ArrowButton>
        <ArrowButton onClick={() => paginate(totalPage)}>
          <KeyboardDoubleArrowRightIcon
            sx={{
              color: "#5B321E",
            }}
          />
        </ArrowButton>
      </Stack>
    </>
  );
};

export default Pagination;
