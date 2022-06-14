import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Box, Grid, Button, Typography, Stack, InputLabel, MenuItem, FormControl, TextField, RadioGroup, Radio, FormControlLabel } from "@mui/material/";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Logo from "../../public/images/logo4.png";
import {createCs} from "../../function/axios";
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


const Cs: FC = () => {
  if (typeof window == "undefined") return null;
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: '#5B321E',
      },
    },
  });

  const [ category, setCategory ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ visible, setVisible ] = useState('공개');

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

  const [id, setId] = useState<any>(0);
  const [token, setToken] = useState<any>();
  const inputRef = useRef([]);
  const [isSSR, setIsSSR] = useState(false);

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

  useEffect(() => {
    setIsSSR(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");

    const desk = {
      category : category,
      title : title,
      content : content,
      visible : visible
    }

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

    if (category === "") {
      alert("카테고리를 선택해주세요.");
      return ;
    }
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    createCs(id, token, desk, imageList)
      .then((res) => {
        console.log(res + "성공");
        Router.push("/cs");
      })
      .catch((err) => console.log(err + "실패"))

  }
  useEffect(() => {
    const Id = localStorage.getItem("id");
    const Token = localStorage.getItem("jwt");
    setId(Id);
    setToken(Token);
  }, [id, token]);


  return (
    <>
    {isSSR ? (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center">
        <Stack sx={{ minWidth: 1200 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <CustomButton variant="contained" href="/cs">
                목록으로
              </CustomButton>
            </Box>
            <Box sx={{ fontWeight: 'bold', my: 5}}>
              <Typography variant="h4" textAlign="center">문의하기</Typography>
            </Box>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{ minWidth: 200}}>
                <FormControl fullWidth>
                  <InputLabel>카테고리 선택</InputLabel>
                  <Select
                    value={category}
                    label="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="문의">문의</MenuItem>
                    <MenuItem value="정보수정">정보 수정</MenuItem>
                    <MenuItem value="신고">신고</MenuItem>
                    <MenuItem value="도움">도움이 필요합니다</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={visible}
                    onChange={(e) => setVisible(e.target.value)}
                  >
                    <FormControlLabel value="공개" control={<Radio />} label="공개" />
                    <FormControlLabel value="비공개" control={<Radio />} label="비공개" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
            <Box sx={{ my : 3}}>
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
              defaultValue="내용 :" 
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
          <Box sx={{my: 5, display: 'flex', justifyContent: 'center'}}>
            <CustomButton size="large" variant="contained" type="submit" onClick={handleSubmit}>등록하기</CustomButton>
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
      ) : null}
    </>
  );
};

export default Cs;
