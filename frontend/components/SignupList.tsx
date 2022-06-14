import { useState, useEffect } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { OCR, userDetail, waitingList, approveSignup } from "../function/axios";
import { styled } from "@mui/material/styles";
import Pagination from './Pagination';


const UpdateButton = styled(Button)({
    backgroundColor: "#5B321E",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#CDAD78",
      color: "white",
    },
  });


const SignupList = () => {
    const numRegex = /\d{3}-\d{2}-\d{5}/g
    const imgUrl = 
    // "http://img1.bizhows.com/bhfile01/__CM_FILE_DATA/202104/15/14/2438331_1618465806169.jpg"
    "https://www.draps.co.kr/app/dubu_board/docs/imgs/f/sm_f15967052034313_lg_i15942817778905_%ED%9A%8C%EC%9B%90%EC%A6%9D_0000_%EC%84%B8%EA%B8%88%EA%B3%84%EC%82%B0%EC%84%9C%EC%9A%A9_%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D_%EB%93%9C%EB%A6%BC%EC%97%90%EC%9D%B4%ED%94%BC%EC%97%90%EC%8A%A4.jpg"
    // "https://beautifulfund.org/bf/files/common/img/business_license.jpg"
    // 'http://aircurt.cafe24.com/default/img/contents/img_01.gif'
    const [step, setStep] = useState<string>('ing')
    const [num, setNum] = useState('')
    const [msg, setMsg] = useState('')
    const [myMsg, setMyMsg] = useState('')
    const [code, setCode] = useState('')

    const [orgList, setOrgList] = useState([])
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)

    // 기관 정보
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEamil] = useState('')
    const [addr, setAddr] = useState('')
    const [day, setDay] = useState('')
    const [intro, setIntro] = useState('')
    const [img, setImg] = useState('')
    const [memberId, setMemberId] = useState('')

    useEffect(() => {
        // waitingList(localStorage.getItem('jwt'), 1)
        // .then(res => {
        //     // console.log(res.data[1].members)
        //     setOrgList(res.data[1].members)

        // })
        paginate(1)
    },[])

    const paginate = (page_) => {
        setPage(page_)
        waitingList(localStorage.getItem('jwt'),page_)
        .then(res => {
            setOrgList(res.data[1].members)
            setTotalPage((res.data[0].total_page-1-(res.data[0].total_page-1)%10)/10 +1)
        })
    }


 
    // 다이얼로그
    const [open, setOpen] = useState(false);
    const handleClickOpen = (e) => {
        userDetail(e)
        .then(res => {
            setName(res.data.name)
            setPhone(res.data.tel)
            setEamil(res.data.email)
            setAddr(res.data.address)
            setDay(res.data.createDate)
            setIntro(res.data.info)
            setImg(res.data.registration)
            setMemberId(res.data.memberId)

            // ocr

            OCR(res.data.registration)
            .then(res => {
                for (var i = 0; i < res.data.images[0].fields.length; i++) {
                    if (res.data.images[0].fields[i].inferText.match(numRegex)) {
                        setCode(res.data.images[0].fields[i].inferText.match(numRegex)[0])
                        axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=vl6BtUPxAdH%2B8i7%2BYzrw9O%2B%2BL22Wxl591V%2BofSgRDIWQCzZrtPYVNJ8%2FzYbqAc%2BNngCsQOLYKuRTl0GZCJoXmQ%3D%3D', {
                            "b_no": [res.data.images[0].fields[i].inferText.match(numRegex)[0].replace(/-/g,'')]
                        })
                        .then(res => {
                            setMyMsg(res.data.data[0].b_stt +' '+ res.data.data[0].tax_type)
                        })
                        .catch(err => console.log(err))

                        setStep('success')
                        break;
                    }
                    else if (i+1 === res.data.images[0].fields.length ) { // 사업자등록번호 못 찾은 경우,
                        setStep('failed')
                    }
                }
                if(res.data.images[0].fields.length === 0){
                    setStep('failed')
                }
            })
            .catch(err => {
                // console.log(err)
                setStep('failed')
            }
            )
        })
        setOpen(true)
    };


    const handleClose = () => {
      setOpen(false);
      setNum('')
      setMsg('')
      setStep('ing')
      setMyMsg('')
      setName('')
      setPhone('')
      setEamil('')
      setAddr('')
      setDay('')
      setIntro('')
      setImg('')
    };


    const onKeyPress = (e) => {
        if (e.key === 'Enter'){
            checkNum()
        }
    }



    // 사업자등록번호 조회
    const checkNum = () => {
        const num2 = num.replace(/-/g,'')
        axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=vl6BtUPxAdH%2B8i7%2BYzrw9O%2B%2BL22Wxl591V%2BofSgRDIWQCzZrtPYVNJ8%2FzYbqAc%2BNngCsQOLYKuRTl0GZCJoXmQ%3D%3D', {
            "b_no": [num2]
        })
        .then(res => {
            // console.log(res.data.data[0])
            setMsg(res.data.data[0].b_stt +' '+ res.data.data[0].tax_type)
        })
        .catch(err => console.log(err))
    }

    // 회원가입 승인
    const approve = () => {
        approveSignup(localStorage.getItem('jwt'), memberId)
        .then(res => {
            paginate(1)
            setPage(1)
        })
        handleClose()
    }



    // 자동 하이픈
    const autoHypenPhone = (str) => {
        str = str.replace(/[^0-9]/g, '');
        var tmp = '';
        if( str.length < 4){
            return str;
        }else if(str.length < 6){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        }else if(str.length < 11){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 2);
            tmp += '-';
            tmp += str.substr(5);
            return tmp;
        }else{              
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 2);
            tmp += '-';
            tmp += str.substr(5);
            return tmp;
        }
        return str;
        }
        useEffect(() => {
        setNum(autoHypenPhone(num))
        }, [num])


    // // 타임스탬프로 변환
    // const Unix_timestampConv = (e) =>{
    //     return Math.floor(e / 1000);
    // }

    // 타임스탬프 값을 년월일로 변환
    const Unix_timestamp = (t) => {
        var date = new Date(t);
        date.setHours(date.getHours()+9)
        var year = date.getFullYear();
        var month = "0" + (date.getMonth()+1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2)
    }


    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 600 }}>
            <TableHead>
                <TableRow>
                <TableCell sx={{ width: 70 }} align="center">번호</TableCell>
                <TableCell>기관명</TableCell>
                <TableCell sx={{ width: 180 }}>가입일</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    orgList.map((e, idx) => {
                        return (
                        <TableRow key={idx}>
                            <TableCell align="center">{idx+1}</TableCell>
                            <TableCell>
                                <span                     
                                    style={{cursor:'pointer'}}
                                    onClick={() => handleClickOpen(e.memberId)}
                                >
                                    {e.name}
                                </span>
                            </TableCell>
                            <TableCell>{Unix_timestamp(Date.parse(e.createDate))}</TableCell>
                            {/* <TableCell>{e.createDate}</TableCell> */}
                        </TableRow>
                        )
                    }
                )}

            </TableBody>
            </Table>
        </TableContainer>

        <Dialog
            open={open}
            // onClose={handleClose}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
        >
            <DialogTitle style={{fontWeight:'bold'}}>
                {name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{fontSize:'18px'}}>
                    연락처 : {phone}
                </DialogContentText>
                <DialogContentText style={{fontSize:'18px'}}>
                    이메일 : {email}
                </DialogContentText>
                <DialogContentText style={{fontSize:'18px'}}>
                    주 &nbsp; 소 : {addr}
                </DialogContentText>
                <DialogContentText style={{fontSize:'18px'}}>
                    가입일 : {Unix_timestamp(day)}
                </DialogContentText>
                <DialogContentText style={{fontSize:'18px'}}>
                    소개글 : {intro}
                </DialogContentText>
                <img 
                    width='550px'
                    src={img}
                />
                <div>
                    <TextField 
                        label="사업자등록번호" 
                        variant="outlined" 
                        size="small" 
                        style={{width:'135px'}}
                        inputProps={{ maxLength: 12 }}
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                        onKeyPress={onKeyPress}
                    />
                    <UpdateButton variant="contained" style={{padding:'8px'}} onClick={checkNum}>조회</UpdateButton>
                    <span style={{fontWeight:'bold', margin:'5px', fontSize:'15px'}}>{msg}</span>
                    
                </div>
            </DialogContent>
            <DialogActions>
                <div style={{marginRight:'auto'}}>
                    {
                        step === 'ing' ? (
                            <div  style={{fontSize:'20px'}}>
                                사업자등록번호 조회중입니다. <CircularProgress size='20px' color="primary"/>
                            </div>
                        ) :
                        (
                            step === 'success' ? (
                                <div style={{fontSize:'20px'}}>
                                    {code} {myMsg}
                                </div>
                            ) :
                            (
                                <div  style={{fontSize:'20px'}}>
                                사업자등록번호 조회에 실패하였습니다.
                                </div>
                            )
                        )
                    }
                </div>
                <UpdateButton variant="contained" onClick={approve}>승인</UpdateButton>
                {/* <Button onClick={handleClose}>거절</Button> */}
            </DialogActions>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
                >
                <CloseIcon />
            </IconButton>

        </Dialog>

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
  
  export default SignupList;