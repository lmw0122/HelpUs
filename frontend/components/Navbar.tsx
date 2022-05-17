import react, { FC, ReactNode, useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  styled,
  Box,
  Stack,
  Link,
} from "@mui/material/";
import Image from "next/image";
import logo from "../public/images/logo3.png";
import { useRouter } from "next/router";

export interface LoginProps {
  value?: any;
}

const ColorAppbar = styled(AppBar)({
  backgroundColor: "#FFFFFF",
  color: "#000000",
});

const Navbar: FC<LoginProps> = ({ value }) => {
  const [isLogin, setIsLogin] = useState<boolean>(value);
  const [role, setRole] = useState("");
  const router = useRouter();

  const pathName = useRouter().pathname;

  const onLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    // router.push('/')
    location.href = "/";
  };

  const onMyPage = () => {
    if (localStorage.getItem("role") === "USER") {
      router.push("/userpage/my");
    } else {
      router.push("/orgpage/my");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogin(true);
      setRole(localStorage.getItem("role"));
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <ColorAppbar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          // sx={{ display: "flex", my: 2, justifyContent: "space-between" }}
          sx={{ display: "flex", my: 2, justifyContent: "space-between" }}
        >
          <Stack direction="row" alignItems="center" sx={{ width: 500 }}>
            <Typography variant="h6" sx={{ mr: 3 }}>
              {pathName === "/donation" ? (
                <Link
                  href="/donation"
                  underline="none"
                  color="#CDAD78"
                  fontWeight="bold"
                  variant="h5"
                >
                  후원하기
                </Link>
              ) : (
                <Link href="/donation" underline="none" color="inherit">
                  후원하기
                </Link>
              )}
            </Typography>
            <Typography variant="h6" sx={{ mx: 3 }}>
              {pathName === "/share" ? (
                <Link
                  href="/share"
                  underline="none"
                  color="#CDAD78"
                  fontWeight="bold"
                  variant="h5"
                >
                  나눔하기
                </Link>
              ) : (
                <Link href="/share" underline="none" color="inherit">
                  나눔하기
                </Link>
              )}
            </Typography>
            <Typography variant="h6" sx={{ mx: 3 }}>
              {pathName === "/cs" ? (
                <Link
                  href="/cs"
                  underline="none"
                  color="#CDAD78"
                  fontWeight="bold"
                  variant="h5"
                >
                  고객센터
                </Link>
              ) : (
                <Link href="/cs" underline="none" color="inherit">
                  고객센터
                </Link>
              )}
            </Typography>
            <Typography variant="h6" sx={{ ml: 3 }}>
              {pathName === "/news" ? (
                <Link
                  href="/news"
                  underline="none"
                  color="#CDAD78"
                  fontWeight="bold"
                  variant="h5"
                >
                  기부뉴스
                </Link>
              ) : (
                <Link href="/news" underline="none" color="inherit">
                  기부뉴스
                </Link>
              )}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Link href="/" underline="none" color="inherit">
              <Image src={logo} alt="logo" width={75} height={80} />
            </Link>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: 500 }}
            justifyContent="right"
          >
            {isLogin ? (
              role === "ADMIN" ? (
                <>
                  <Typography variant="h6" sx={{}}>
                    {pathName === "/admin" ? (
                      <Link
                      onClick={() => router.push("/admin")}
                        underline="none"
                        color="#CDAD78"
                        fontWeight="bold"
                        variant="h5"
                      >
                        관리자 페이지
                      </Link>
                    ) : (
                      <Link onClick={() => router.push("/admin")} underline="none" color="inherit">
                        관리자 페이지
                      </Link>
                    )}
                  </Typography>

                  <Typography variant="h6" sx={{ ml: 2 }}>
                    <Link
                      onClick={onLogout}
                      underline="none"
                      color="inherit"
                      style={{ cursor: "pointer" }}
                    >
                      로그아웃
                    </Link>
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mx: 2 }}>
                    {pathName === "/userpage/my" || pathName === "/userpage/my/talent" || pathName === "/userpage/my/cs"
                    || pathName === "/userpage/my/delivery" || pathName === "/userpage/my/donation" || pathName === "/userpage/my/volunteer"
                    || pathName === "/orgpage/my" || pathName === "/orgpage/my/review" || pathName === "/orgpage/my/cs"
                    || pathName === "/orgpage/my/checkdonation" || pathName === "/orgpage/my/donation" || pathName === "/orgpage/my/volunteer" 
                    || pathName === "/orgpage/my/checkvolunteer" || pathName === "/orgpage/my/checkdelivery"  ? (
                      <Link
                      onClick={onMyPage}
                        underline="none"
                        color="#CDAD78"
                        fontWeight="bold"
                        variant="h5"
                      >
                        마이페이지
                      </Link>
                    ) : (
                      <Link onClick={onMyPage} underline="none" color="inherit">
                        마이페이지
                      </Link>
                    )}
                  </Typography>

                  <Typography variant="h6" sx={{ ml: 2 }}>
                    <Link
                      onClick={onLogout}
                      underline="none"
                      color="inherit"
                      style={{ cursor: "pointer" }}
                    >
                      로그아웃
                    </Link>
                  </Typography>
                </>
              )
            ) : (
              <>
                <Typography variant="h6" sx={{ mx: 2 }}>
                  {pathName === "/login" ? (
                      <Link
                      onClick={() => router.push("/login")}
                        underline="none"
                        color="#CDAD78"
                        fontWeight="bold"
                        variant="h5"
                      >
                        로그인
                      </Link>
                    ) : (
                      <Link onClick={() => router.push("/login")} underline="none" color="inherit">
                        로그인
                      </Link>
                    )}
                </Typography>

                <Typography variant="h6" sx={{ ml: 2 }}>
                  {pathName === "/signup" || pathName === "/signup/user" || pathName === "/signup/org" ? (
                    <Link
                    onClick={() => router.push("/signup")}
                      underline="none"
                      color="#CDAD78"
                      fontWeight="bold"
                      variant="h5"
                    >
                      회원가입
                    </Link>
                  ) : (
                    <Link onClick={() => router.push("/signup")} underline="none" color="inherit">
                      회원가입
                    </Link>
                  )}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </ColorAppbar>
  );
};

export default Navbar;
