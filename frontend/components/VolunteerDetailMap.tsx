import styled from "@emotion/styled";
import { FC, useEffect } from "react";

interface MapProps {
  item: any;
}

const VolunteerDetailMap: FC<MapProps> = ({ item }) => {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    // mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"),
            options = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${item.volAddress}`, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(item);
            var imageSrc = 'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/d39b9657-fc82-424c-9ec7-57b88d009f19icon.png', // 마커이미지의 주소입니다    
            imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage //마커이미지 설정
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            // var infowindow = new window.kakao.maps.InfoWindow({
            //   content:
            //     '<div style="width:150px;text-align:center;padding:6px 0;">봉사 장소</div>',
            // });
            // infowindow.open(map, marker);

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var content = `<div class="customoverlay" style="position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;">
              <a href="https://map.kakao.com/link/search/'${item.volAddress}'" target="_blank" style="display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">
                <span class="title" style="display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;">봉사 장소</span>
              </a>
            </div>`;

            // 커스텀 오버레이를 생성합니다
            var customOverlay = new window.kakao.maps.CustomOverlay({
              map: map,
              position: marker.getPosition(),
              content: content,
              yAnchor: 1 
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });

        // const markerPosition = new window.kakao.maps.LatLng(
        //   33.450701,
        //   126.570667
        // );
        // const marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });
        // marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [item]);

  return <MapContainer id="map" />;
};

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
  /* justify-content: ; */
`;

export default VolunteerDetailMap;
