import { FC } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import { OCR_kakao, searchCerti } from "function/axios";
import { styled } from "@mui/material/styles";
import Image from "next/image";


const UpdateButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});



const CheckCerti: FC = () => {

  const [imageUrl, setImageUrl] = useState('')

  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [num3, setNum3] = useState('')
  const [num4, setNum4] = useState('')

  const input2 = useRef(null)
  const input3 = useRef(null)
  const input4 = useRef(null)

  const imageUpload = useRef(null)
  // const [certiFile, setCertiFile] = useState('')

  useEffect(() => {
    setNum1(autoUpper(num1))
    if (autoUpper(num1).length === 4){
      input2.current.focus()
    }
  },[num1])

  useEffect(() => {
    setNum2(autoUpper(num2))
    if (autoUpper(num2).length === 4){
      input3.current.focus()
    }
  },[num2])

  useEffect(() => {
    setNum3(autoUpper(num3))
    if (autoUpper(num3).length === 4){
      input4.current.focus()
    }
  },[num3])

  useEffect(() => {
    setNum4(autoUpper(num4))
  },[num4])
  

  // 영문자, 숫자만 입력 / 소문자 -> 대문자
  const autoUpper = (str) => {
    str = str.replace(/[^0-9a-zA-Z]/g, '');
    str = str.toUpperCase()
    return str
  }
  

  const authRegex = /[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}/g


  // 파일 선택시
  const onImageChange = (e) => {
    OCR_kakao(e.target.files[0])
    .then(res => {
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].recognition_words[0].match(authRegex)) {
            setNum1(res.data.result[i].recognition_words[0].match(authRegex)[0].slice(0,4))
            setNum2(res.data.result[i].recognition_words[0].match(authRegex)[0].slice(5,9))
            setNum3(res.data.result[i].recognition_words[0].match(authRegex)[0].slice(10,14))
            setNum4(res.data.result[i].recognition_words[0].match(authRegex)[0].slice(15,19))
            break;
        }
        // console.log(res.data.result[i].recognition_words[0])
        // else if (i+1 === res.data.images[0].fields.length ) { // 사업자등록번호 못 찾은 경우,
        //     setStep('failed')
        // }
        // console.log(res)
      }
    })
  }


  // 업로드 버튼 클릭시
  const clickImageUpload = () => {
      imageUpload.current.click()
  }

  // 확인 버튼 클릭시
  const search = () => {
    setImageUrl('')
    searchCerti(num1+'-'+num2+'-'+num3+'-'+num4)
    .then(res => setImageUrl(res.data.url))
    .catch(err => alert('증명서가 존재하지 않습니다.'))
  }

  return (
  <>
    <div style={{maxWidth:'800px', minHeight:'600px', margin:'auto', textAlign: 'center'}}>
      
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{width:'100px'}}></div>
        <h1>증명서 진위 확인</h1>
        <UpdateButton 
          variant="contained" 
          style={{margin:'10px', marginTop:'15px'}}
          size='small'
          onClick={clickImageUpload}
        >
          사진 업로드
        </UpdateButton>
        <input 
          type="file" 
          accept='image/*'
          ref={imageUpload}
          onChange={onImageChange}
          style={{display:"none"}}
        />
      </div>
      
      <br></br>


      
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <span style={{margin:'3px', alignItems: 'center', fontSize:'20px', marginRight:'10px'}}>문서확인번호: </span>
        <TextField 
          label="" 
          variant="outlined" 
          size="small" 
          style={{width:'75px'}}
          inputProps={{ maxLength: 4 }}
          autoFocus
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <span style={{margin:'5px', alignItems: 'center'}}>-</span>
        <TextField 
          label="" 
          variant="outlined" 
          size="small" 
          style={{width:'75px'}}
          inputProps={{ maxLength: 4 }}
          inputRef={input2}
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <span style={{margin:'5px', alignItems: 'center'}}>-</span>
        <TextField 
          label="" 
          variant="outlined" 
          size="small" 
          style={{width:'75px'}}
          inputProps={{ maxLength: 4 }}
          inputRef={input3}
          value={num3}
          onChange={(e) => setNum3(e.target.value)}
        />
        <span style={{margin:'5px', alignItems: 'center'}}>-</span>
        <TextField 
          label="" 
          variant="outlined" 
          size="small" 
          style={{width:'75px'}}
          inputProps={{ maxLength: 4 }}
          inputRef={input4}
          value={num4}
          onChange={(e) => setNum4(e.target.value)}
        />

        <UpdateButton 
          variant="contained" 
          style={{marginLeft:'10px'}}
          disabled={num1.length!=4 || num2.length!=4 || num3.length!=4 || num4.length!=4} 
          onClick={search}
        >
          확인
        </UpdateButton>

      </div>

      {
        imageUrl !== "" ?
        (
          // <Image 
          //   src= {imageUrl}
          //   alt=""
          //   width={600}
          //   height={800}
          // />
          <div>
          <img style={{width:'800px'}} src={imageUrl} alt="" />
          </div>
        ) : null
      }

      

    </div>
  </>
  )
};

export default CheckCerti;
