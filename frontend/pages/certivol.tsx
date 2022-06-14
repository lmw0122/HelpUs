import { FC, useState, useEffect } from "react";
import Image from "next/image";
import logo3 from "../public/images/logo3.png";
import logo4 from "../public/images/logo100x100.png";
import background from "../public/images/background.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import html2canvas from 'html2canvas'
import { styled } from "@mui/material/styles";
import { tokenCheck, makeCerti, getDonatonAll, getMyvolunteerList, getVolunteerAll } from "../function/axios";


const UpdateButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});


const CertiVol: FC = () => {

 
  const [list, setList] = useState([])
  const [checked, setChecked] = useState([])
  const [ing, setIng] = useState(false)
  const [certiNum, setCertiNum] = useState('')
  const [full, setFull] = useState([])
  const [timeSum, setTimeSum] = useState(0)

  // 유저 정보
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()


  // 기부 목록 받아오기
  useEffect(() => {

    // 유저 정보 받아오기
    tokenCheck()
    .then(res => {
      if (res){
        // console.log(res)
        if (String(res.data.memberId) !== localStorage.getItem('id')){
          location.href = '/'
        }
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.tel)
        // console.log(res)
      }
    })

    // getMyvolunteerList(localStorage.getItem('id'), {'page':1})
    getVolunteerAll(localStorage.getItem('id'))
    .then(res => {
      if (res.data.listVolunteer){
        // console.log(res.data.listVolunteer)
        setList(res.data.listVolunteer)
        const arr = Array.from({length: res.data.listVolunteer.length}, (v, i) => i)
        setFull(arr)
        let sum_ = 0;
        res.data.listVolunteer.forEach((item) => {
          sum_ += item.time
        })
        setTimeSum(sum_)
      }else{
        const arr = []
        setFull(arr)
      }
    })

    // getDonatonAll(localStorage.getItem('id'))
    // .then(res => {
    //   // console.log(res.data.apply)
    //   if (res.data.apply){
    //     setList(res.data.apply)
    //     const arr = Array.from({length: res.data.apply.length}, (v, i) => i)
    //     setFull(arr)
    //   }else{
    //     const arr = []
    //     setFull(arr)
    //   }
    // })
  },[])

  // 체크박스 선택시
  const handleChange = (e) => {
    if (checked.includes(Number(e.target.value))){
      setChecked(checked.filter(idx => idx !== Number(e.target.value)))
    }else{
      setChecked([...checked, Number(e.target.value)])
    }
  }

  // 전체 선택
  const checkAll = () => {
    setChecked(full)
  }

  // 전체 해제
  const checkNotAll = () => {
    setChecked([])
  }

  // 전체 버튼 클릭시
  const checkButton = () => {
    if (checked.length === list.length){
      checkNotAll()
    }else{
      checkAll()
    }
  }

  // 현재 날짜
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let dateFormat = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+date.toString()).slice(-2));


  // 버튼 클릭시
  const onClick = () => {
    setIng(true)
    setChecked(checked.sort((a, b) => a - b))
    setCertiNum(randomString(4)+'-'+randomString(4)+'-'+randomString(4)+'-'+randomString(4))
  }


  // 증명번호 생성 후, 증명서 생성
  useEffect(() => {
    if (certiNum !== ''){
      setTimeout(function() {
        onHtmlToPng()
      }, 1000);
      // onHtmlToPng()
    }
  },[certiNum])



  // 난수 생섬 함수
  const randomString = (count) => {
    let str = '';
    for (let i = 0; i < count; i++) {
        let x = Math.floor(Math.random() * 36).toString(36)
        // console.log(x)
        if (x === '0'){
          str += '7'
        } else if (x === 'o'){
          str += '5'  
        } else if (x === '1'){
          str += '3'
        } else if (x === 'i'){
          str += '6'
        }else{
          str += x
        }
        // str += Math.floor(Math.random() * 36).toString(36);
    }
    str = str.toUpperCase()
    // console.log(str)
    return str
  }

  // div -> png
  const onHtmlToPng = () => {
    html2canvas(document.getElementById('div')).then(canvas=>{
      onSave(canvas.toDataURL('image/png'), `봉사내역확인서 ${dateFormat} ${name}.png`)
      // console.log(canvas)
    })
  }
  const onSave = (uri, filename) => {
    // console.log(dataURItoBlob(uri))
    makeCerti(certiNum, dataURItoBlob(uri))
    .then(res => {
      var link = document.createElement('a')
      document.body.appendChild(link)
      link.href = uri
      link.download = filename
      link.click()
      document.body.removeChild(link)
      setIng(false)
      setCertiNum('')
      setChecked([])
    })
    .catch(err => {
      console.log(err)
      setIng(false)
      alert('다시 시도해주세요.')
    })

  }


  // 이미지 파일 형식 변환
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // 마임타입 추출
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

  const Unix_timestamp = (t) => {
    var date = new Date(t);
    date.setHours(date.getHours() + 9)
    var year = date.getFullYear();
    var month = "0" + (date.getMonth()+1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2)
  }

  return (
    <>
      <div style={{maxWidth:'700px', minHeight:'600px', margin:'auto', textAlign: 'center'}}>
        <h1>나의 봉사내역</h1>
        <Image 
          src= {logo4}
          alt=""
          width={1}
          height={1}
        />
        <Image 
          src= {background}
          alt=""
          width={1}
          height={1}
        />


        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 800 }}>
            <TableHead >
              <TableRow >
                <TableCell sx={{ width: 60 }} align="center">
                  <Checkbox 
                    style={{padding:'0px', color: "#5B321E"}}
                    checked={checked.length === list.length}
                    onChange={checkButton}
                  />
                </TableCell>
                <TableCell sx={{ width: 70 }} align="center">번호</TableCell>
                <TableCell sx={{ width: 230 }}>기관명</TableCell>
                <TableCell sx={{ width: 150 }} align="center">시간</TableCell>
                {/* <TableCell sx={{ width: 80 }}>수량</TableCell> */}
                <TableCell sx={{ width: 150 }}>날짜</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {
              list.map((e, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell align="center" style={{padding:'4px'}}>
                      <Checkbox 
                        checked={checked.includes(idx)}
                        onChange={handleChange}
                        name={`list-${idx}`}
                        value={idx}
                        style ={{color: "#5B321E"}}
                      />
                    </TableCell>
                    <TableCell align="center" >{idx+1}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell align="center">{e.time}</TableCell>
                    {/* <TableCell>{e.count}</TableCell> */}
                    <TableCell>{Unix_timestamp(e.volDate)}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
          </Table>
        </TableContainer>

        <UpdateButton
          variant="contained" 
          style={{marginTop:'20px'}}
          onClick={() => onClick()}
          disabled={checked.length === 0}
        >
          확인서 발급
        </UpdateButton>
      </div>

      {
        ing ?
        (
          <>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div id='div' style={{width:'1000px'}}>
              <div style={{padding:'80px'}}>
                <span style={{fontSize:'20px'}}>문서확인번호: {certiNum}</span>

                <div style={{border:'1px solid black', padding:'50px', paddingBottom:'30px'}}>
                <div style={{marginTop:'100px', position:'absolute', width:'750px', height:'750px'}}>
                  <Image 
                      src= {background}
                      alt=""
                      // width={1000}
                      // height={1000}
                    />
                </div>
                <span style={{display: 'flex', justifyContent: 'center', margin:'30px', fontSize:'40px', fontWeight:'bold'}}>봉사내역 확인서</span>
                <h2>성 &nbsp; 함 : {name}</h2>
                <h2>연락처 : {phone}</h2>
                <h2>이메일 : {email}</h2>
                
                <br />
                <h1 style={{display: 'flex', justifyContent: 'center'}}>봉사내역</h1>
                <div style={{minHeight:'500px'}}>
               
                  <TableContainer  style={{display: 'flex', justifyContent: 'center'}}>
                    <Table>
                      <TableHead >
                        <TableRow>
                          <TableCell sx={{ width: 70 }} align="center" style={{padding:'12px'}}>번호</TableCell>
                          <TableCell sx={{ width: 230 }} style={{padding:'12px'}}>기관명</TableCell>
                          <TableCell sx={{ width: 150 }} align="center" style={{padding:'12px'}}>시간</TableCell>
                          {/* <TableCell sx={{ width: 80 }} style={{padding:'12px'}}>수량</TableCell> */}
                          <TableCell sx={{ width: 150 }} style={{padding:'12px'}}>날짜</TableCell>
                        </TableRow>
                      </TableHead>

                    <TableBody>
                      {
                        checked.map((e, idx) => {
                          return (
                            <TableRow key={idx} >
                              <TableCell align="center" style={{padding:'12px'}}>{idx+1}</TableCell>
                              <TableCell style={{padding:'12px'}}>{list[e].name}</TableCell>
                              <TableCell align="center" style={{padding:'12px'}}>{list[e].time}</TableCell>
                              {/* <TableCell style={{padding:'12px'}}>{list[e].count}</TableCell> */}
                              <TableCell style={{padding:'12px'}}>{Unix_timestamp(list[e].volDate)}</TableCell>
                            </TableRow>
                          )
                        }
                      )}
                    </TableBody>

                    </Table>
                  </TableContainer>
                  <span style={{display:"flex",justifyContent:'end', fontWeight:'bold', fontSize:'20px',marginRight:'210px', marginTop:'10px'}}>총합: {timeSum}시간</span>
                </div>
                <h2 style={{display: 'flex', justifyContent: 'center'}}>위와 같이 봉사하였음을 확인합니다.</h2>
                <h2 style={{display: 'flex', justifyContent: 'center', marginBottom:'10px'}}>{year}년 {month}월 {date}일</h2>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <span style={{fontSize:'40px', fontWeight:'bold', marginTop:'20px', marginLeft:'90px'}}>헬프어스</span>
                  {/* <Image 
                    src= {logo3}
                    alt=""
                    width={100}
                    height={100}
                  /> */}
                  <Image 
                    src= {logo4}
                    alt=""
                    // width={100}
                    // height={100}
                  />
                </div>

              </div>
              </div>
            </div>
          </>
        ) : null
      }



      <Dialog open={ing}>
        <DialogTitle>
          확인서 발급중입니다.
          <CircularProgress size='20px' color="primary" style={{marginLeft:'10px'}}/>
        </DialogTitle>
      </Dialog>




    </>
  );
};

export default CertiVol;
