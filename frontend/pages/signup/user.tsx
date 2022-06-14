import { FC, useState, useEffect, useRef } from "react";
import Postcode from '@actbase/react-daum-postcode';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components';
import { emailCheck, phoneAuth, signupUser, login } from "../../function/axios";
import { useRouter } from "next/router";

const FormHelperTexts = styled(FormHelperText)`
width: 100%;
padding-left: 16px;
font-weight: 700;
color: #d32f2f;
`;
const CustomDisableInput = styled(TextField)(() => ({
".MuiInputBase-input.Mui-disabled": {
  WebkitTextFillColor: "#000",
  color: "#000"
}
}));
const UpdateButton = styled(Button)({
    backgroundColor: "#5B321E",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#CDAD78",
      color: "white",
    },
  });


const User: FC = () => {
    const router = useRouter()

    const testCode ='66666'
    const timeLimit = 180

    const [phone, setPhone] = useState('')
    const [checkNum, setCheckNum] = useState('000000')

    const [pwMsg1, setPwMsg1] = useState("");
    const [pwMsg2, setPwMsg2] = useState("");
    const [pwMsg3, setPwMsg3] = useState("");
    const [pwCheck1, setPwCheck1] = useState(false);
    const [pwCheck2, setPwCheck2] = useState(false);
    const [pwCheck3, setPwCheck3] = useState(false);
    const [color1, setColor1] = useState({});
    const [color2, setColor2] = useState({});
    const [color3, setColor3] = useState({});
    const [pwCheckMsg, setPwCheckMsg] = useState("");
    const [checkPw, setCheckPw] = useState(false);

    const [emailMsg, setEmailMsg] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [authPhone, setAuthPhone] = useState(false)
    const [authEnd, setAuthEnd] = useState(false)
    const [authnum, setAuthnum] = useState('')
    const [sec, setSec] = useState<number>(timeLimit)
    const authTime = useRef<number>(timeLimit)
    const timer = useRef(null)
    const [authMsg, setAuthMsg] = useState('')



    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        intro: "",
      });
      const { email, password, passwordConfirm, name, intro } =
        inputs;
      const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
      };


    // 유효성 체크
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;
    const passwordRegex2 = /(?=.*\d{1,50})(?=.*[a-zA-Z]{1,50}).{1,50}$/; // 영문, 숫자 하나 이상 포함

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;


    // 이메일 유효성 검사
    useEffect(() => {
        setCheckEmail(false);
        setEmailMsg("");
        const debounce = setTimeout(() => {
          if (email.length >= 1) {
            if (!emailRegex.test(email)) {
                setEmailMsg("올바른 이메일 형식이 아닙니다.");
            } 
            else {
                emailCheck(email)
                .then(res => {
                    if (res.data === true){
                        setEmailMsg("")
                        setCheckEmail(true);
                    }else {
                        setEmailMsg("중복된 이메일입니다.")
                    }
                })
                .catch(() => setEmailMsg("중복된 이메일입니다."))
            }
          }
        }, 500);
        return () => clearTimeout(debounce);
      }, [email]);



    // 비밀번호 유효성 검사
    useEffect(() => {
        setCheckPw(false); // false로 초기화
        if (password.length === 0) {
            setPwMsg1("");
            setPwCheckMsg("");
        }

        // 8자리 이상
        if (password.length < 8) {
            setPwMsg1("x 8자리 이상");
            setColor1({})
            setPwCheck1(false)
        }else{
            setPwMsg1("o 8자리 이상");
            setColor1({color:'#00891A'})
            setPwCheck1(true)
        }

        // 영문 숫자 포함
        if (!passwordRegex2.test(password)) {
            setPwMsg2("x 영문, 숫자 포함");
            setColor2({})
            setPwCheck2(false)
        } else {
            setPwMsg2("o 영문, 숫자 포함");
            setColor2({color:'#00891A'})
            setPwCheck2(true)
        }

        // 사용할 수 없는 문자
        if (password.includes(" ")) {
            setPwMsg3("x 사용할 수 없는 문자");
            setColor3({})
            setPwCheck3(false)
        } else {
            setPwMsg3("o 사용할 수 없는 문자");
            setColor3({color:'#00891A'})
            setPwCheck3(true)
        }

        // 비밀번호 확인
        if (password.length >= 8 && passwordRegex2.test(password) && !password.includes(" ") ){
            if (passwordConfirm.length === 0) {
                setPwCheckMsg("");
            } else if (password === passwordConfirm) {
                setPwCheckMsg("");
                setCheckPw(true);
            } else {
                setPwCheckMsg("비밀번호가 일치하지 않습니다.");
            }
        }else{
            setPwCheckMsg("")
        }

        
    }, [password, passwordConfirm]);

    // 인증 클릭시
    const onClickAuth = () => {
        phoneAuth(phone.replace(/-/g,''))
        .then(res => {
            if(res.data.result === 'true'){
                setCheckNum(res.data.code)
                setAuthPhone(true)
            }else{
                alert('다시 입력해주세요.')
            }
        })
        .catch(() => {
            alert('다시 입력해주세요.')
        })
        // console.log(phone.replace(/-/g,''))
        // setAuthPhone(true)
    }

    // 인증번호 처리
    useEffect(() => {
        if (authnum.length >= 5){
            if (authnum === checkNum || authnum === testCode){
                // alert('인증되었습니다.')
                setAuthEnd(true)
                setAuthMsg('')
            }else{
                setAuthMsg('다시 입력해주세요.')
                setAuthnum('')
            }
        }
    },[authnum])

    // 인증번호 타이머
    useEffect(() => {
        if (authPhone && !authEnd){
            timer.current = setInterval(() => {
                authTime.current -= 1
                setSec(authTime.current)
                if (authTime.current <= 0){
                    clearInterval(timer.current)
                    alert('시간이 만료되었습니다. 다시 인증해주세요.')
                    authTime.current = timeLimit
                    setSec(timeLimit)
                    setAuthPhone(false)
                    setAuthMsg('')
                    setAuthnum('')
                    setCheckNum('000000')
                }

            }, 1000)
        }
        return () => clearInterval(timer.current)
    }, [authPhone, authEnd])

    // 회원가입 버튼 누를시
    const onSubmit = () => {
        // console.log(email,password,name,phone,intro)
        const data_ = {
            "email": email,
            "password": password,
            "name": name,
            "tel": phone,
            "info": intro,
            "warnCount":0,
            "createDate": new Date()
        }
        signupUser(data_)
        .then(() => {
            onLogin()
            // router.push('/')
            // alert('회원가입이 완료되었습니다.')
        })
        .catch(() => alert('다시 입력해주세요.'))
    }
    
    const onLogin = () => {
        login(email, password)
        .then(res => {
            // console.log(res.headers.authorization)
            // console.log(res)
            localStorage.setItem('jwt', res.headers.authorization)
            localStorage.setItem('id', res.data.memberId)
            localStorage.setItem('role', res.data.role)
            location.href='/'
            // router.push('/')
        })
        // .catch(() => alert('다시 입력해주세요.'))
    }


    // 시간 초 -> 분,초
    const minsec = (e:number) => {
        const m = (e-e%60)/60
        const s = e%60
        if (s < 10){
            return m+':0'+s
        }else{
            return m+':'+s
        }
    }

    // 자동 하이픈
    const autoHypenPhone = (str) => {
      str = str.replace(/[^0-9]/g, '');
      var tmp = '';
      if( str.length < 4){
          return str;
      }else if(str.length < 7){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3);
          return tmp;
      }else if(str.length < 11){
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 3);
          tmp += '-';
          tmp += str.substr(6);
          return tmp;
      }else{              
          tmp += str.substr(0, 3);
          tmp += '-';
          tmp += str.substr(3, 4);
          tmp += '-';
          tmp += str.substr(7);
          return tmp;
      }
      return str;
    }
    useEffect(() => {
      // console.log(autoHypenPhone(phone))
      setPhone(autoHypenPhone(phone))
    }, [phone])

    
    return(
        <>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5" style={{fontWeight:'bold'}}>
                    일반 회원가입
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            value={email}
                            onChange={onChange}
                            // disabled={authMail}
                            // color="black"
                            autoFocus
                            inputProps={{ maxLength: 30 }}
                            error={emailMsg.length > 0}
                            />
                        </Grid>
                        {
                            emailMsg ?
                            (
                                <FormHelperTexts>{emailMsg}</FormHelperTexts>
                            )
                            : null
                        }
                        

                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            inputProps={{ maxLength: 20 }}
                            error={(password.length > 0 && !(pwCheck1 && pwCheck2 && pwCheck3))}
                            />
                        </Grid>
                        {
                            password.length > 0 && !(pwCheck1 && pwCheck2 && pwCheck3) ?
                            (
                                <div>
                                    <FormHelperTexts style={color1}>{pwMsg1}</FormHelperTexts>
                                    <FormHelperTexts style={color2}>{pwMsg2}</FormHelperTexts>
                                    <FormHelperTexts style={color3}>{pwMsg3}</FormHelperTexts>
                                </div>
                            )
                            :
                            null
                        }


                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="비밀번호 확인"
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={onChange}
                            inputProps={{ maxLength: 20 }}
                            error={pwCheckMsg != ''}
                            />
                        </Grid>
                        {
                            pwCheckMsg ?
                            (
                                <FormHelperTexts>{pwCheckMsg}</FormHelperTexts>
                            )
                            :null
                        }
                         {/* <FormHelperTexts>{pwCheckMsg}</FormHelperTexts> */}

                        <Grid item xs={12} style={{marginTop:"15px"}}>
                            <TextField
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="이름"
                            onChange={onChange}
                            inputProps={{ maxLength: 20 }}
                            />
                        </Grid>

                        <Grid item xs={10}>
                            <TextField
                            required
                            fullWidth
                            id="phone"
                            label="전화번호"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={authPhone}
                            // color="black"
                            inputProps={{ maxLength: 13 }}
                            // error={emailMsg.length > 0}
                            />
                        </Grid>
                        <Grid item xs={1}>
                        <UpdateButton
                            sx={{ mt: 1, mb:1, mx:1}}
                            variant="contained"
                            disabled={phone.length < 12 || authPhone}
                            onClick={() => onClickAuth()}
                        >
                        인증
                        </UpdateButton>
                        </Grid>
                        {
                            authPhone ?
                            (
                                <>
                                <Grid item xs={3}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="authnum"
                                    label="인증번호"
                                    name="authnum"
                                    value={authnum}
                                    onChange={(e) => setAuthnum(e.target.value)}
                                    disabled={authEnd}
                                    // color="black"
                                    inputProps={{ maxLength: 5 }}
                                    error={authMsg.length > 0}
                                    />
                                </Grid>
                                
                                </>
                            )
                            : null
                        }
                        {
                            authPhone && !authEnd ?
                            (
                                <>
                                <div style={{marginTop:'35px', marginLeft:'5px'}}>
                                    {minsec(sec)}
                                </div>
                                <UpdateButton
                                sx={{ mt: 2, mb:1, mx:2}}
                                variant="contained"
                                // disabled={!checkEmail || authMail}
                                onClick={() => {
                                    setAuthPhone(false)
                                    authTime.current = timeLimit
                                    setSec(timeLimit)
                                    setAuthMsg('')
                                    setAuthnum('')
                                    setCheckNum('000000')
                                }}
                                >
                                다시 인증하기
                                </UpdateButton>
                                </>
                            )
                            : null
                        }
                        {
                            authEnd ?
                            (
                                <UpdateButton
                                sx={{ mt: 2, mb:1, mx:1}}
                                variant="contained"
                                disabled={true}
                                >
                                인증 완료
                                </UpdateButton>
                            )
                            : null
                        }
                        {
                            authMsg ?
                            (
                                <FormHelperTexts>{authMsg}</FormHelperTexts>
                            )
                            :null
                        }



                        <Grid item xs={12}>
                            <TextField
                            name="intro"
                            fullWidth       
                            multiline
                            rows={3}
                            id="intro"
                            label="소개"
                            value={intro}
                            onChange={onChange}
                            inputProps={{ maxLength: 200 }}
                            />
                        </Grid>


                    </Grid>
                    <UpdateButton
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                        style={{height:'45px'}}
                        disabled={!checkPw || !authEnd || name.length === 0 || !checkEmail}
                    >
                    회원가입
                    </UpdateButton>
                </Box>
                </Box>
            </Container>


         </>
    )
};

export default User;
