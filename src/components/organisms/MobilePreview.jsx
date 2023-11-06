import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Star from "/MobilePreview/star.svg";
import Time from "/MobilePreview/time.svg";
import Location from "/MobilePreview/location.svg";
import AC from "/MobilePreview/ac.svg";
import Garage from "/MobilePreview/garage.svg";
import Light from "/MobilePreview/light.svg";
import Tel from "/MobilePreview/tel.svg";
import Underside from "/MobilePreview/underside.svg";
import Tapwater from "/MobilePreview/tapwater.svg";
import Breakroom from "/MobilePreview/breakroom.svg";
import Waterproof from "/MobilePreview/waterproof.svg";

const MobilePreview = ({ inputs }) => {
  const keypoints = [
    <div className="flex gap-2">
      <img src={Underside} alt="하부세차 아이콘" width={16} />
      <div>하부세차</div>
    </div>,
    <div className="flex gap-2">
      <img src={Garage} alt="차고 아이콘" width={16} />
      <div>개러지형 독립공간</div>
    </div>,
    <div className="flex gap-2">
      <img src={Light} alt="전구 아이콘" width={16} />
      <div>야간조명</div>
    </div>,
    <div className="flex gap-2">
      <img src={Tapwater} alt="물방울 아이콘" width={16} />
      <div>100% 수돗물</div>
    </div>,
    <div className="flex gap-2">
      <img src={Breakroom} alt="커피잔 아이콘" width={16} />
      <div>휴게실</div>
    </div>,
    <div className="flex gap-2">
      <img src={AC} alt="에어컨 아이콘" width={16} />
      <div>에어컨</div>
    </div>,
    <div className="flex gap-2">
      <img src={Waterproof} alt="방수 아이콘" width={16} />
      <div>발수코팅건</div>
    </div>,
  ];

  return (
    <div className="relative overflow-auto bg-white shadow-xl rounded-xl grow">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}>
        {inputs.carwashImage.map((image, index) => (
          <div key={index}>
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt="이미지"
              className="h-56"
            />
          </div>
        ))}
      </Carousel>

      <div className="grid gap-4 p-4">
        {/* 세차장 이름, 별점, 예약베이 */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">{inputs.carwashName}</div>
            <div className="flex items-center gap-1">
              <img src={Star} alt="" className="w-3 h-3" />
              <div className="text-sm">5.0</div>
              <div className="text-sm text-gray-400">(500)</div>
            </div>
          </div>
          <div>
            <div className="text-3xl text-center text-primary">4</div>
            <div className="text-sm font-semibold">예약베이</div>
          </div>
        </div>

        {/* 영업시간, 주소 */}
        <div className="grid gap-2 p-4 text-sm bg-gray-100 rounded-xl">
          <div className="flex gap-2">
            <img src={Time} alt="시계 아이콘" />
            <div>
              <div className="flex gap-1">
                <div>평일</div>
                {inputs.weekdayOpenTime === "00:00" &&
                inputs.weekdayCloseTime === "23:59" ? (
                  <div>24시간 운영</div>
                ) : (
                  <div>
                    {inputs.weekdayOpenTime}~{inputs.weekdayCloseTime}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <div>주말</div>
                {inputs.weekendOpenTime === "00:00" &&
                inputs.weekendCloseTime === "23:59" ? (
                  <div>24시간 운영</div>
                ) : (
                  <div>
                    {inputs.weekendOpenTime}~{inputs.weekendCloseTime}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <img src={Tel} alt="전화 아이콘" />
            <div>{inputs.carwashTel}</div>
          </div>
          <div className="flex gap-2">
            <img src={Location} alt="위치 아이콘" />
            <div>{inputs.carwashAddress}</div>
          </div>
        </div>

        {/* 키포인트 */}
        <div className="grid gap-2 p-4 bg-gray-100 rounded-xl">
          <div className="font-bold">키포인트</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {keypoints.map((keypoint, index) => {
              if (inputs.keypoint.includes(index)) return keypoint;
            })}
          </div>
        </div>

        {/* 세차장 설명 */}
        <p className="overflow-auto text-sm whitespace-pre-wrap h-60">
          {inputs.carwashDescription}
        </p>
      </div>
    </div>
  );
};

export default MobilePreview;
