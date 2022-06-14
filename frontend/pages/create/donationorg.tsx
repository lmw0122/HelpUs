import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  Input,
} from "@mui/material/";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Divider } from "@material-ui/core";

// api
import { createDonation } from "../../function/axios";
import Logo from "../../public/images/logo4.png";
import Router from "next/router";

import ExpiryDate from "@/components/ExpiryDate";

const CustomButton = styled(Button)({
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
  color: "#5B321E",
});

const DonationOrg: FC = (props) => {
  if (typeof window == "undefined") return null;
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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image, setImage] = useState({ image_file: [], preview_URL: Logo });

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

  const [endDate, setEndDate] = useState("");
  const [formValues, setFormValues] = useState([
    { productName: "", totalCount: 0, productInfo: "" },
  ]);
  const [id, setId] = useState<any>(0);
  // let inputRef: any;
  const inputRef = useRef([]);

  // 물품 수량 설명 form 설정
  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  // 물품 input칸 추가
  const addFormFields = () => {
    if (formValues.length >= 6){
      alert('물품은 최대 6개까지 가능합니다.')
    } else{
      setFormValues([
        ...formValues,
        { productName: "", totalCount: 0, productInfo: "" },
      ]);
    }

  };
  // 물품 input칸 삭제
  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

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
      // console.log(image1);
      // console.log(image1.image_file);
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
      // console.log(image2);
      // console.log(image2.image_file);
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
      // console.log(image3);
      // console.log(image3.image_file);
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
      // console.log(image4);
      // console.log(image4.image_file);
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
      // console.log(image5);
      // console.log(image5.image_file);
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  useEffect(() => {
    setIsSSR(true);
  }, []);

  // 물품 기부 등록
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

    const donation = {
      title: title,
      content: content,
      endDate: endDate,
      products: formValues,
    };

    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (endDate === "") {
      alert("종료일을 선택해주세요.");
      return;
    }

    if (
      formValues[0].productName === "" ||
      formValues[0].totalCount === 0 ||
      formValues[0].productInfo === ""
    ) {
      alert("기부 물품 입력칸을 채워주세요.");
      return;
    }

    // for (let i = 0; formValues.length < i; i++) {
    //   if (
    //     formValues[i].productName === "" ||
    //     formValues[i].totalCount === 0 ||
    //     formValues[i].productInfo === ""
    //   ) {
    //     alert("기부 물품 입력칸을 채워주세요.");
    //     return;
    //   }
    // }

    if (imageList.length < 1) {
      alert("사진은 최소 1장 필수입니다.");
      return;
    }

    createDonation(id, token, donation, imageList)
      .then((res) => {
        // console.log(res + "성공");
        Router.push("/donation");
      })
      .catch((err) => console.log(err + "실패"));
  };

  useEffect(() => {
    const Id = localStorage.getItem("id");
    setId(Id);
  }, [id]);

  const [isSSR, setIsSSR] = useState(false);

  return (
    <>
      {isSSR ? (
        <ThemeProvider theme={theme}>
          <Grid container justifyContent="center" alignItems="center">
            <Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CustomButton variant="contained" href="/donation">
                  목록으로
                </CustomButton>
              </Box>
              <Box sx={{ fontWeight: "bold", my: 5 }}>
                <Typography variant="h4" textAlign="center">
                  물품 기부
                </Typography>
              </Box>
              <Box
                maxWidth="100"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ExpiryDate></ExpiryDate>
              </Box>
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
              <Stack direction="row" sx={{ mt: 5, alignItems: "center" }}>
                <Typography variant="h5" sx={{ mr: 2, fontWeight: "bold" }}>
                  종료일
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="날짜"
                    value={endDate}
                    inputFormat={"yyyy-MM-dd"}
                    mask={"____-__-__"}
                    onChange={(date) => {
                      setEndDate(dayjs(date).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
              <Stack
                direction="row"
                sx={{ mt: 5, mb: 2, justifyContent: "space-between" }}
              >
                <Stack direction="row">
                  <Box minWidth={220}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      품명
                    </Typography>
                  </Box>
                  <Box minWidth={130}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      수량
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      설명
                    </Typography>
                  </Box>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <OutlinedButton
                    variant="outlined"
                    onClick={() => addFormFields()}
                  >
                    +
                  </OutlinedButton>
                </Box>
              </Stack>
              <Divider />
              <form>
                {formValues.map((element, index) => (
                  <div className="form-inline" key={index}>
                    <Stack direction="row" sx={{ mt: 2 }}>
                      <Box maxWidth={180}>
                        <TextField
                          label="품명"
                          variant="outlined"
                          name="productName"
                          value={element.productName || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </Box>
                      <Box maxWidth={100} sx={{ mx: 4 }}>
                        <TextField
                          label="수량"
                          variant="outlined"
                          name="totalCount"
                          value={element.totalCount || ""}
                          onChange={(e) => handleChange(index, e)}
                          inputProps={{ maxLength: 3 }}
                        />
                      </Box>
                      <Box>
                        <TextField
                          label="설명"
                          variant="outlined"
                          sx={{ width: 800 }}
                          name="productInfo"
                          value={element.productInfo || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </Box>
                      {index ? (
                        <OutlinedButton
                          variant="outlined"
                          sx={{ ml: 1 }}
                          onClick={() => removeFormFields(index)}
                        >
                          삭제
                        </OutlinedButton>
                      ) : null}
                    </Stack>
                  </div>
                ))}
              </form>
              <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
                <CustomButton
                  size="large"
                  variant="contained"
                  type="submit"
                  // onSubmit={handleSubmit}
                  onClick={handleSubmit}
                >
                  등록하기
                </CustomButton>
              </Box>
            </Stack>
          </Grid>
        </ThemeProvider>
      ) : null}
    </>
  );
};

export default DonationOrg;
