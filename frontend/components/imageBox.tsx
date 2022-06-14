import { useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material/";
import logo from "../publiC/images/logo4.png";

const imageBox = () => {
  const [ image, setImage ] = useState({image_file: "", preview_URL: logo,});
  const [loaded, setLoaded] = useState(false);
  let inputRef: any;
  
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    e.preventDefault();
    const fileReader = new FileReader();

      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
      }
      let new_image;
      fileReader.onload = () => {
        new_image = fileReader.result;
        setImage({
          image_file: e.target.files[0],
          preview_URL: new_image,
        });
        setLoaded(true);
      };
      try {
        console.log(image)
      } catch (err) {
        console.log("Error uploading file: ", err);
      } 
    }

  return (
    <div>
      <input 
        type="file" 
        id="chooseFile" 
        accept="image/*" 
        ref={(refParam) => (inputRef = refParam)}
        onChange={onChangeImage} 
        style={{ display: 'none' }}
      />
      <Box width={220} height={220} sx={{backgroundColor: '#FCF8F0', cursor: "pointer" }}>
      {loaded === false || loaded === true ? (
        <Image 
          src={image.preview_URL}
          alt="이미지"
          width="220"
          height="220"
          onClick={() => inputRef.click()}
        />
      ) : (
        <span>이미지를 불러오는 중입니다.</span>
      )}
      </Box>
      
    </div>
  )
}
export default imageBox;