import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo3 from "../public/images/logo3.png";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { login } from "../function/axios";

const UpdateButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const TextField1 = styled(TextField)({
  "& label.Mui-focused": {
    color: "#5B321E",
  },
  //   '& .MuiInput-underline:after': {
  //     borderBottomColor: 'yellow',
  //   },
  "& .MuiOutlinedInput-root": {
    // '& fieldset': {
    //   borderColor: 'white',
    // },
    // '&:hover fieldset': {
    //   borderColor: 'white',
    // },
    "&.Mui-focused fieldset": {
      borderColor: "#CDAD78",
    },
  },
});

const Login: FC = () => {
  const router = useRouter();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onLogin = () => {
    login(id, pw)
      .then((res) => {
        // console.log(res.headers.authorization)
        // console.log(res)
        localStorage.setItem("jwt", res.headers.authorization);
        localStorage.setItem("id", res.data.memberId);
        localStorage.setItem("role", res.data.role);
        location.href = "/";
        // router.push('/')
      })
      .catch(() => alert("다시 입력해주세요."));
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };
  // localStorage.setItem('key', '12')
  // console.log(localStorage.getItem('key'))

  return (
    <>
      <div
        style={{
          maxWidth: "400px",
          minHeight: "700px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <br />
        <Image src={logo3} width="200" height="200" />
        <TextField1
          name="id"
          fullWidth
          id="id"
          label="아이디"
          type="email"
          style={{ marginTop: "20px" }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />

        <TextField1
          name="password"
          fullWidth
          id="password"
          type="password"
          label="비밀번호"
          style={{ marginTop: "20px" }}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          inputProps={{ maxLength: 20 }}
          onKeyPress={onKeyPress}
        />

        <UpdateButton
          fullWidth
          variant="contained"
          style={{ marginTop: "20px", height: "45px", fontSize: "18px" }}
          onClick={onLogin}
        >
          로그인
        </UpdateButton>
      </div>
    </>
  );
};

export default Login;
