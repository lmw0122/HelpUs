import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC } from "react";
import Image from "next/image";

interface Iimages {
  item: any;
}

const Container = styled.div`
  /* overflow: hidden; */
  background-color: "#ffffff";
  width: 500px;
  margin-left: 0px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

const CustomCarousel: FC<Iimages> = ({ item }) => {
  // console.log("itemsss", item);
  return (
    <Container>
      <StyledSlider {...settings}>
        {item &&
          item.map((image, i) => (
            <div key={i}>
              <ImageContainer>
                <Image
                  src={image}
                  alt="등록 이미지"
                  width="500px"
                  height="500px"
                />
              </ImageContainer>
            </div>
          ))}
      </StyledSlider>
    </Container>
  );
};

export default CustomCarousel;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // centerMode: true,
  // centerPadding: "350px",
  arrows: false,
};
