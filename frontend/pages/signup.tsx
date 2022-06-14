import { FC } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import logo3 from "../public/images/logo3.png";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const UpdateButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const Signup: FC = () => {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          minHeight: "700px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <br />
        <br />
        <Image src={logo3} width="200" height="200" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "200px",
              height: "100px",
              border: "1px solid",
              borderRadius: "5%",
              margin: "20px",
              padding: "5px",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              일반회원
            </span>
            <br />
            <UpdateButton
              style={{ marginTop: "10px" }}
              onClick={() => router.push("/signup/user")}
            >
              가입하기
            </UpdateButton>
          </div>
          <div
            style={{
              width: "200px",
              height: "100px",
              border: "1px solid",
              borderRadius: "5%",
              margin: "20px",
              padding: "5px",
            }}
          >
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              기관회원
            </span>
            <br />
            <UpdateButton
              style={{ marginTop: "10px" }}
              onClick={() => router.push("/signup/org")}
            >
              가입하기
            </UpdateButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
