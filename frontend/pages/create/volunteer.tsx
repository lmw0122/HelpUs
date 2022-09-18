import { FC, useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  TextareaAutosize,
  Dialog,
  OutlinedInput,
} from "@mui/material/";
import dayjs from "dayjs";
import Image from "next/image";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Logo from "../../public/images/logo4.png";
import Postcode from "@actbase/react-daum-postcode";

// api
import { createVolunteer } from "../../function/axios";
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

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000",
  },
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

// const volunteerTimes = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5' ,'8']
// const volunteerTimes = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5 ,8]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Volunteer: FC = () => {
  if (typeof window == "undefined") return null;
  const [value, setValue] = useState<Date | null>(null);
  const [id, setId] = useState<any>(0);
  const [token, setToken] = useState<any>(0);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [people, setPeople] = useState<number | string>();
  const [startValue, setStartValue] = useState<string>("");
  const [time, setTime] = useState<any>("");

  const [post, setPost] = useState<string | number>("");
  const [addr, setAddr] = useState<string>("");
  const [addr2, setAddr2] = useState<any>("");

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

  const inputRef = useRef([]);
  const [isSSR, setIsSSR] = useState(false);

  // 우편번호 찾기 클릭시
  const [open, setOpen] = useState<boolean>(false);
  const open2 = useRef(false); // 타이머 중, dialog 리렌더링 방지

  const handleClickOpen = () => {
    setOpen(true);
    open2.current = true;
  };
  const handleClose = () => {
    setOpen(false);
    open2.current = false;
  };

  const onChange = (e) => {
    setAddr2(e.target.value);
  };

  const handleChange = (event) => {
    setTime(event.target.value as string);
    // console.log(typeof time)
  };

  // const handleStartValue = (event) => {
  //   setStartValue(dayjs(event.target.value as string).format("YYYY-MM-DD HH:mm"))
  //   console.log(startValue)
  // }

  // 이미지 업로드
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

    const volunteerReqDto = {
      title: title,
      content: content,
      people: people,
      volDate: startValue,
      time: time,
      volZipcode: post,
      volAddress: addr + " " + addr2,
    };
    console.log();
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (people === "") {
      alert("봉사 인원을 입력해주세요.");
      return;
    }
    if (startValue === "") {
      alert("시작날짜와 시간을 입력해주세요.");
      return;
    }
    if (time === "") {
      alert("봉사 소요 시간을 입력해주세요.");
      return;
    }
    if (post === "") {
      alert("우편번호를 입력해주세요.");
      return;
    }
    // if (addr2 === "") {
    //   alert("상세주소를 입력해주세요.");
    //   return;
    // }
    // console.log(id);

    createVolunteer(id, token, volunteerReqDto, imageList)
      .then((res) => {
        console.log(res + "성공");
        Router.push("/donation?value=1");
      })
      .catch((err) => console.log(err + "실패"));
  };

  useEffect(() => {
    const Id = localStorage.getItem("id");
    const Token = localStorage.getItem("jwt");
    setId(Id);
    setToken(Token);
  }, [id, token]);

  useEffect(() => {
    setIsSSR(true);
  }, []);

  return (
    <>
      {isSSR ? (
        <ThemeProvider theme={theme}>
          <Grid container justifyContent="center" alignItems="center">
            <Stack sx={{ minWidth: 1200 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CustomButton variant="contained" href="/donation">
                  목록으로
                </CustomButton>
              </Box>
              <Box sx={{ fontWeight: "bold", my: 5 }}>
                <Typography variant="h4" textAlign="center" fontWeight="bold">
                  봉사 글 작성
                </Typography>
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
              <Typography variant="h5" sx={{ mt: 3 }}>
                봉사 장소
              </Typography>
              <Stack direction="row" sx={{ mt: 3 }} alignItems="center">
                <CustomDisableInput
                  sx={{ width: 480 }}
                  name="post"
                  required
                  fullWidth
                  id="post"
                  label="우편번호"
                  value={post}
                  disabled={true}
                />
                <UpdateButton
                  sx={{ mx: 1, height: 55 }}
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  우편번호 찾기
                </UpdateButton>
              </Stack>
              <Stack sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <CustomDisableInput
                    sx={{ width: 600 }}
                    name="addr1"
                    required
                    fullWidth
                    id="addr1"
                    label="주소"
                    value={addr}
                    disabled={true}
                    onChange={(e) => setAddr(e.target.value)}
                  />
                </Grid>
              </Stack>
              <Stack sx={{ mt: 1 }}>
                <Grid item xs={12} style={{ marginBottom: "15px" }}>
                  <TextField
                    sx={{ width: 600 }}
                    name="addr2"
                    fullWidth
                    id="addr2"
                    label="상세 주소"
                    value={addr2}
                    onChange={onChange}
                    inputProps={{ maxLength: 30 }}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" sx={{ mt: 3 }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography variant="h5" sx={{ mr: 2 }}>
                    봉사 인원
                  </Typography>
                  <Box>
                    <TextField
                      label="봉사 인원"
                      variant="outlined"
                      onChange={(e) => setPeople(e.target.value)}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mx: 3 }}>
                    봉사 시작 날짜
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="시작 시간&#38;날짜 선택"
                      value={startValue}
                      inputFormat={"yyyy-MM-dd hh:mm"}
                      mask={"____-__-__ __:__"}
                      onChange={(date) => {
                        setStartValue(dayjs(date).format("YYYY-MM-DD HH:mm"));
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Typography variant="h5" sx={{ mx: 3 }}>
                    봉사 소요 시간
                  </Typography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="time">시간 선택</InputLabel>
                    <Select
                      labelId="time"
                      id="time"
                      value={time}
                      onChange={handleChange}
                      input={<OutlinedInput label="시간 선택" />}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value={0.5}>0.5</MenuItem>
                      <MenuItem value={1}>1.0</MenuItem>
                      <MenuItem value={1.5}>1.5</MenuItem>
                      <MenuItem value={2}>2.0</MenuItem>
                      <MenuItem value={2.5}>2.5</MenuItem>
                      <MenuItem value={3}>3.0</MenuItem>
                      <MenuItem value={3.5}>3.5</MenuItem>
                      <MenuItem value={4}>4.0</MenuItem>
                      <MenuItem value={4.5}>4.5</MenuItem>
                      <MenuItem value={5}>5.0</MenuItem>
                      <MenuItem value={5.5}>5.5</MenuItem>
                      <MenuItem value={6}>6.0</MenuItem>
                      <MenuItem value={6.5}>6.5</MenuItem>
                      <MenuItem value={7}>7.0</MenuItem>
                      <MenuItem value={7.5}>7.5</MenuItem>
                      <MenuItem value={8}>8.0</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
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
          <>
            <Dialog open={open} onClose={handleClose}>
              <Postcode
                style={{ width: 500, height: 500 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onError={() => console.log("우편번호 찾기 error")}
                onSelected={(data) => {
                  // console.log(data)
                  setAddr(data.address);
                  setPost(data.zonecode);
                  // console.log(JSON.stringify(data))
                  setOpen(false);
                  open2.current = false;
                }}
              />
            </Dialog>
          </>
        </ThemeProvider>
      ) : null}
    </>
  );
};

export default Volunteer;
