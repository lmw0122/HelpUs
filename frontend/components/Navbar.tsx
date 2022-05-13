import react, { FC, ReactNode, useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, Typography, styled, Box, Stack, Link } from "@mui/material/";
import Image from 'next/image';
import logo from "../public/images/logo3.png";
import { useRouter } from "next/router";


export interface LoginProps {
  value?: any;
}

const ColorAppbar = styled(AppBar) ({
  backgroundColor: "#FFFFFF",
  color: "#000000",
  
});


const Navbar: FC<LoginProps> = ({ value }) => {
  const [ isLogin, setIsLogin ] = useState<boolean>(value);
  const [role, setRole] = useState('')
  const router = useRouter()

  const onLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    // router.push('/')
    location.href='/'
  }

  const onMyPage = () => {
    if (localStorage.getItem('role') === 'USER'){
      router.push('/userpage/my')
    }else{
      router.push('/orgpage/my')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')){
      setIsLogin(true)
      setRole(localStorage.getItem('role'))
    }else{
      setIsLogin(false)
    }
  },[])

  return (
    <ColorAppbar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", my : 2, justifyContent: 'space-between'}} >
            <Link href="/" underline="none" color="inherit">
              <Image 
                src={logo}
                alt='logo'
                width={65}
                height={70}
              />
            </Link>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row">
              <Typography variant="h6" sx={{ mx: 2}}>
                <Link href="/donation" underline="none" color="inherit">
                  후원하기
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mx: 2 }}>
                <Link href="/share" underline="none" color="inherit">
                  나눔하기
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mx: 2 }}>
                <Link href="/cs" underline="none" color="inherit">
                  고객센터
                </Link>
              </Typography>
              <Typography variant="h6" sx={{ mx: 2 }}>
                <Link href="/news" underline="none" color="inherit">
                  기부 소식
                </Link>
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row">

              {
                isLogin ? (
                  (
                    role === 'ADMIN' ? (
                      <>
                        <Typography variant="h6" sx={{ mx: 2 }}>
                          <Link 
                            onClick={() => router.push('/admin')} 
                            underline="none" 
                            color="inherit"
                            style={{cursor:'pointer'}}
                          >관리자 페이지</Link>  
                        </Typography> 
    
                        <Typography variant="h6" sx={{ mx: 2 }}>
                          <Link 
                            onClick={onLogout} 
                            underline="none" 
                            color="inherit"
                            style={{cursor:'pointer'}}
                          >로그아웃</Link>  
                        </Typography>  
                      </>
                    ) :
                    (
                      <>
                        <Typography variant="h6" sx={{ mx: 2 }}>
                          <Link 
                            onClick={onMyPage}
                            underline="none" 
                            color="inherit"
                            style={{cursor:'pointer'}}
                          >마이페이지</Link>  
                        </Typography> 
    
                        <Typography variant="h6" sx={{ mx: 2 }}>
                          <Link 
                            onClick={onLogout} 
                            underline="none" 
                            color="inherit"
                            style={{cursor:'pointer'}}
                          >로그아웃</Link>  
                        </Typography>  
                      </>
                    )
                  )
                ) : (
                  <>
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      <Link 
                        onClick={() => router.push('/login')} 
                        underline="none" 
                        color="inherit"
                        style={{cursor:'pointer'}}
                      >로그인</Link>  
                    </Typography>  

                    <Typography variant="h6" sx={{ mx: 2 }}>
                      <Link 
                        onClick={() => router.push('/signup')} 
                        underline="none" 
                        color="inherit"
                        style={{cursor:'pointer'}}
                      >회원가입</Link>  
                    </Typography> 
                  </>
                )
              } 
 
            </Stack>
          </Box> 
        </Toolbar>
      </Container>
    </ColorAppbar>
  );
};

export default Navbar;
