import { FC, useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material/";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Logo from "../../../public/images/logo4.png";
// import Logo from "../../../public"

// api
import { createReview } from "../../../function/axios";
import { donationDetail } from "../../../function/axios";
import { useRouter } from "next/router";
import Router from "next/router";

const CustomButton = styled(Button)({
  backgroundColor: "#5B321E",
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#CDAD78",
    color: "white",
  },
});

const Review: FC = () => {
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: "#5B321E",
      },
    },
  });

  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [donationId, setDonationId] = useState<any>();

  const [donationInfo, setDonationInfo] = useState<any>("");

  const [id, setId] = useState<any>(0);
  const inputRef = useRef([]);

  // 이미지 리스트
  const imageList = [];
  // 5개의 이미지
  const [image1, setImage1] = useState({ image_file: "", preview_URL: Logo });
  const [image2, setImage2] = useState({ image_file: "", preview_URL: Logo });
  const [image3, setImage3] = useState({ image_file: "", preview_URL: Logo });
  const [image4, setImage4] = useState({ image_file: "", preview_URL: Logo });
  const [image5, setImage5] = useState({ image_file: "", preview_URL: Logo });

  // 프리뷰 로딩
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const [loaded4, setLoaded4] = useState(false);
  const [loaded5, setLoaded5] = useState(false);

  // 이미지 업로드 1
  const onChangeImage1 = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    let new_image;

    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage1({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded1(true);
    };

    try {
      console.log(image1);
      console.log(image1.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  const onChangeImage2 = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    let new_image;

    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage2({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded2(true);
    };

    try {
      console.log(image2);
      console.log(image2.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  const onChangeImage3 = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    let new_image;

    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage3({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded3(true);
    };

    try {
      console.log(image3);
      console.log(image3.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  const onChangeImage4 = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    let new_image;

    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage4({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded4(true);
    };

    try {
      console.log(image4);
      console.log(image4.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  const onChangeImage5 = (e) => {
    e.preventDefault();
    let fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }

    let new_image;

    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage5({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded5(true);
    };

    try {
      console.log(image5);
      console.log(image5.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  // 후기를 적을 물품 기부 글 불러오기
  useEffect(() => {
    if (router.isReady) {
      setDonationId(router.query.id);
      donationDetail(router.query.id).then((res) => {
        setDonationInfo(res.data.donation);
      });
    }
  }, [router.isReady]);

  // 후기 등록
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");

    if (image1.image_file !== "") {
      imageList.push(image1.image_file);
    }
    if (image2.image_file !== "") {
      imageList.push(image2.image_file);
    }
    if (image3.image_file !== "") {
      imageList.push(image3.image_file);
    }
    if (image4.image_file !== "") {
      imageList.push(image4.image_file);
    }
    if (image5.image_file !== "") {
      imageList.push(image5.image_file);
    }

    const confirm = {
      title: title,
      content: content,
      donationId: donationId,
    };

    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (imageList.length < 1) {
      alert("사진은 최소 1장 필수입니다.");
      return;
    }

    createReview(id, token, confirm, imageList)
      .then((res) => {
        if(res.status === 200){
          alert("해당 기부 글의 후기가 존재합니다.")
        }
        console.log(res + "성공");
        Router.push("/review");
      })
      .catch((err) => console.log(err + "실패"));
  };

  useEffect(() => {
    const Id = localStorage.getItem("id");
    setId(Id);
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center">
        <Stack sx={{ minWidth: 1200 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomButton variant="contained" href="/review">
              목록으로
            </CustomButton>
          </Box>
          <Box sx={{ fontWeight: "bold", my: 5 }}>
            <Typography variant="h4" textAlign="center">
              인증하기
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 20 }}>
            기부글 제목 : {donationInfo.title}
          </Typography>
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            minRows={15}
            placeholder="내용"
            onChange={(e) => setContent(e.target.value)}
          />
          <Stack
            direction="row"
            sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
          >
            <>
              <input
                type="file"
                id="chooseFile"
                accept="image/*"
                ref={(refParam) => (inputRef.current[0] = refParam)}
                onChange={onChangeImage1}
                style={{ display: "none" }}
              />
              <Box
                width={220}
                height={220}
                sx={{ backgroundColor: "#FCF8F0", cursor: "pointer" }}
              >
                {loaded1 === false || loaded1 === true ? (
                  <Image
                    src={image1.preview_URL}
                    alt="이미지"
                    width="220"
                    height="220"
                    onClick={() => inputRef.current[0].click()}
                  />
                ) : (
                  // <image onClick={() => inputRef.click()}>{imagePreview}</image>
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </Box>
            </>
            <>
              <input
                type="file"
                id="chooseFile"
                accept="image/*"
                ref={(refParam) => (inputRef.current[1] = refParam)}
                onChange={onChangeImage2}
                style={{ display: "none" }}
              />
              <Box
                width={220}
                height={220}
                sx={{ backgroundColor: "#FCF8F0", cursor: "pointer" }}
              >
                {loaded2 === false || loaded2 === true ? (
                  <Image
                    src={image2.preview_URL}
                    alt="이미지"
                    width="220"
                    height="220"
                    onClick={() => inputRef.current[1].click()}
                  />
                ) : (
                  // <image onClick={() => inputRef.click()}>{imagePreview}</image>
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </Box>
            </>
            <>
              <input
                type="file"
                id="chooseFile"
                accept="image/*"
                ref={(refParam) => (inputRef.current[2] = refParam)}
                onChange={onChangeImage3}
                style={{ display: "none" }}
              />
              <Box
                width={220}
                height={220}
                sx={{ backgroundColor: "#FCF8F0", cursor: "pointer" }}
              >
                {loaded3 === false || loaded3 === true ? (
                  <Image
                    src={image3.preview_URL}
                    alt="이미지"
                    width="220"
                    height="220"
                    onClick={() => inputRef.current[2].click()}
                  />
                ) : (
                  // <image onClick={() => inputRef.click()}>{imagePreview}</image>
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </Box>
            </>
            <>
              <input
                type="file"
                id="chooseFile"
                accept="image/*"
                ref={(refParam) => (inputRef.current[3] = refParam)}
                onChange={onChangeImage4}
                style={{ display: "none" }}
              />
              <Box
                width={220}
                height={220}
                sx={{ backgroundColor: "#FCF8F0", cursor: "pointer" }}
              >
                {loaded4 === false || loaded4 === true ? (
                  <Image
                    src={image4.preview_URL}
                    alt="이미지"
                    width="220"
                    height="220"
                    onClick={() => inputRef.current[3].click()}
                  />
                ) : (
                  // <image onClick={() => inputRef.click()}>{imagePreview}</image>
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </Box>
            </>
            <>
              <input
                type="file"
                id="chooseFile"
                accept="image/*"
                ref={(refParam) => (inputRef.current[4] = refParam)}
                onChange={onChangeImage5}
                style={{ display: "none" }}
              />
              <Box
                width={220}
                height={220}
                sx={{ backgroundColor: "#FCF8F0", cursor: "pointer" }}
              >
                {loaded5 === false || loaded5 === true ? (
                  <Image
                    src={image5.preview_URL}
                    alt="이미지"
                    width="220"
                    height="220"
                    onClick={() => inputRef.current[4].click()}
                  />
                ) : (
                  // <image onClick={() => inputRef.click()}>{imagePreview}</image>
                  <span>이미지를 불러오는 중입니다.</span>
                )}
              </Box>
            </>
          </Stack>
          <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
            <CustomButton
              size="large"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              등록하기
            </CustomButton>
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
};

export default Review;
