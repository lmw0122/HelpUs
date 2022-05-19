import { FC, useState, useEffect } from "react";
import { getNewsList } from "function/axios";
import Pagination from "@/components/Pagination";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  Button,
  InputBase,
  Paper,
  Tabs,
  ThemeProvider,
} from "@mui/material/";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import volunteer1 from "../public/images/volunteer1.jpg";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CDAD78",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "#FCF8F0",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // height: 70,
  // rowStyle: { height: 50 },
  // maxHeight: ,
}));

const Chatting: FC = () => {
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: "#5B321E",
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [chatroomList, setChatroomList] = useState<any>(null);

  // useEffect(() => {
  //   getNewsList(params).then((res) => {
  //     setChatroomList(res.data.news);
  //     // console.log("data는", reviewList);
  //     setLoading(true);
  //   });
  // }, []);

  return (<div></div>
    // <ThemeProvider theme={theme}>
    //   <Container maxWidth="lg" direction="row">
    //     <Grid
    //       item
    //       md={6}
    //       align="center"
    //     >
    //       <Box>

    //       </Box>

    //     </Grid> 
    //     <Grid
    //       item
    //       md={6}
    //       align="center"
    //     >

    //     </Grid> 
        
    //   </Container>
    // </ThemeProvider>
  );
};

export default Chatting;
