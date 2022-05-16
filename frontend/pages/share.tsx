import { FC, useState, useEffect } from "react";
import { Box, Grid, Typography, Stack, Button, InputBase, Paper, Link } from "@mui/material/";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { styled } from "@mui/material/styles";
import volunteer1 from "../public/images/volunteer1.jpg";
import { getTalentDonationList } from "function/axios";

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
  height: 62,
}));


const dummyData = [
  {
    donationApplyId: 1,
    title: "엉키는 마음은 꿈에선 다 잊게 영원처럼 안아줘",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 2,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 3,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 4,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 5,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 6,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 7,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: true,
  },
  {
    donationApplyId: 8,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: false,
  },
  {
    donationApplyId: 9,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: false,
  },
  {
    donationApplyId: 10,
    title: "더미",
    memberID: 1,
    name: "콜리",
    productList: ["찐빵", "사이다"],
    donationDate: "2022-05-03",
    expressNum: 1234,
    fact: false,
  },
];


const Share: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [talentDonationList, setTalentDonationList] = useState<any>(null);
  // pagination
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const params = {
    page: curPage + 1,
  };

  useEffect(() => {
    getTalentDonationList(params).then((res) => {
      setTalentDonationList(res.data.listTalentDonation);
      setTotalPages(res.data.totalPage);
      // console.log("data는", reviewList);
      setLoading(true);
    });
  }, [curPage]);

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
      <Stack>
        <Box textAlign="center" >
          <Image 
            src= {volunteer1}
            alt="volunteer first"
            width={1200}
            height={200}
          />
        </Box>
        <Box sx={{ fontWeight: 'bold', my: 5}}>
          <Typography variant="h4" textAlign="center">재능 기부 목록</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <CustomButton variant="contained">재능 기부 등록</CustomButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt : 2}}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="검색"
            />
            <IconButton type="submit" sx={{ p: '10px' }} >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <TableContainer component={Paper} sx={{ my: 5 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      번호
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      제목
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      작성자
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontSize: 17 }}>
                      작성일
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {talentDonationList && talentDonationList.map((data) => (
                    <StyledTableRow key={data.volunteerId}>
                      <StyledTableCell align="center">
                        {data.volunteerId}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: 400 }}>
                        <Link href={`/detail/talent/${data.volunteerId}`} underline="none" color="inherit">
                          {data.title}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.createDate}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Stack>
      </Grid>
    </div>
  );
};

export default Share;
