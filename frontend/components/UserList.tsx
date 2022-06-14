import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
import { getAllUser, warning, searchUser } from "../function/axios";
import Pagination from './Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const UpdateButton = styled(Button)({
    backgroundColor: "#5B321E",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#CDAD78",
      color: "white",
    },
  });

const OutlinedButton = styled(Button)({
    border: "1px solid #5B321E",
    color: "#5B321E"
  })

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    borderRadius:'2%',
    boxShadow: 24,
    padding: 1,
    paddingLeft: 3,
    paddingRight: 3,

  };

const UserList = () => {

    const [searchWay, setSearchWay] = useState('name')
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState<number>(1)

    // 검색
    const [keyword, setKeyword] = useState('')
    const [keyword2, setKeyword2] = useState('')
    const [searchWay2, setSearchWay2] = useState('')

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setName('')
        setEmail('')
        setMemberId('')
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [memberId, setMemberId] = useState('')

    const handleChange = (e) => {
        setSearchWay(e.target.value);
    }

    const paginate = (page_) => {
        setPage(page_)
        if (keyword2 === ''){
            getAllUser(localStorage.getItem('jwt'),page_)
            .then(res => {
                setList(res.data[1].members)
                setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
            })
        }else{
            searchUser(localStorage.getItem('jwt'), searchWay2, keyword2, page_)
            .then(res => {
                // console.log(res)
                setList(res.data[1].members)
                setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
            })
        }

    }


    useEffect(() => {
        getAllUser(localStorage.getItem('jwt'), 1)
        .then(res => {
            setList(res.data[1].members)
            // console.log((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10)
            setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
            // console.log(res.data[1].members)
        })
    },[])


    // 검색
    const onSearch = () => {
        setPage(1)
        setKeyword2(keyword)
        setSearchWay2(searchWay)
        if (keyword === ''){
            getAllUser(localStorage.getItem('jwt'), 1)
            .then(res => {
                setList(res.data[1].members)
                setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
            })
        }else{
            searchUser(localStorage.getItem('jwt'), searchWay, keyword, 1)
            .then(res => {
                // console.log(res)
                setList(res.data[1].members)
                setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
            })
        }

    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter'){
            onSearch()
        }
    }




    // 리스트에서 경고 누름
    const onWarning = (e) => {
        setEmail(e.email)
        setName(e.name)
        setMemberId(e.memberId)
        handleOpen()
    }

    // 모달에서 경고 누름
    const clickWarning = () => {
        warning(localStorage.getItem('jwt'), memberId)
        .then(() => {
            paginate(page)
        })
        handleClose()

    }

    // 이름 클릭
    const onClickName = (e) => {
        // console.log(e)
        if (e.role === 'USER'){
            // console.log('user')
            window.open(`/userpage/${e.memberId}`, '_blank')
        }else{
            // console.log('else')
            window.open(`/orgpage/${e.memberId}`, '_blank')

        }
    }
 

    return (
        <>
            <div style={{marginBottom:'20px', display: 'flex', justifyContent: 'flex-end'}}>
                <FormControl sx={{  minWidth: 126 }} size="small">
                    <Select
                        value={searchWay}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={'name'}>기관명/이름</MenuItem>
                    <MenuItem value={'email'}>이메일</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    size="small"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)} 
                    onKeyPress={onKeyPress}
                />
                <UpdateButton variant="contained" style={{padding:'8px'}} onClick={onSearch} >
                    검색
                </UpdateButton>
            </div>
            

            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 600 }}>
                <TableHead >
                    <TableRow>
                        <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}} sx={{ width: 70 }} align="center">번호</TableCell>
                        <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}} sx={{ width: 160 }}>기관명/이름</TableCell>
                        <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}}>이메일</TableCell>
                        <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}} sx={{ width: 120 }}>경고횟수</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        list.map((e, idx) => {
                            return (
                            <TableRow key={idx}>
                                <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}} align="center">{e.memberId}</TableCell>
                                <TableCell style={{paddingTop:'8px', paddingBottom:'8px', cursor:'pointer'}} onClick={() => onClickName(e)}>{e.name}</TableCell>
                                <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}}>{e.email}</TableCell>
                                <TableCell style={{paddingTop:'8px', paddingBottom:'8px'}}>
                                    {e.warnCount}
                                    <UpdateButton 
                                        variant="contained" 
                                        size="small" 
                                        style={{marginLeft:'15px'}} 
                                        onClick={() => onWarning(e)}
                                    >경고</UpdateButton>           
                                </TableCell>
                            </TableRow>
                            )
                        }
                    )}

                </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            경고창
                        </Typography>
   
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            이 &nbsp; 름 : {name} 
                        </Typography>
                        <Typography id="modal-modal-description" >
                            이메일 : {email} 
                        </Typography>
                        <div style={{marginTop:'3px', display:'flex', justifyContent:'end'}}>
                            <UpdateButton 
                                style={{marginRight:'3px'}}
                                onClick={clickWarning}
                            >경고</UpdateButton>
                            <OutlinedButton
                                onClick={handleClose}
                            >취소</OutlinedButton>
                        </div>
                    </Box>
                </Modal>
            </div>
            
            <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                <Pagination
                    curPage={page}
                    paginate={paginate}
                    totalPage={totalPage}
                    
                />
            </div>

        </>

    )
  }
  
  export default UserList;