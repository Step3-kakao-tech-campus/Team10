import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import KeyPointSelector from "../molecules/KeyPointSelector";
import RegisterFormItemStructure from "../atoms/RegisterFormItemStructure";
import DaumPostcodePicker from "../molecules/DaumPostcodePicker";
import ImageUploader from "../molecules/ImageUploader";
import OpTimePicker from "../molecules/OpTimePicker";
import { useEffect } from "react";

/**
 * RegisterForm
 *
 * 세차장 입점신청 폼입니다.
 *
 * @todo 각 input에 대한 validation 필요
 */
const RegisterForm = ({ inputs, onChange, mutation, buttonLabel }) => {
  const pointLabels = [
    "하부세차",
    "개러지형 독립공간",
    "야간조명",
    "100% 수돗물",
    "휴게실",
    "에어컨",
    "발수코팅건",
  ];

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(inputs.carwashAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        onChange("latitude", result[0].y);
        onChange("longitude", result[0].x);
      }
    });
  }, [inputs.carwashAddress]);

  return (
    <form
      className="grid gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(inputs);
      }}>
      {/* Wrapper */}
      <div className="flex gap-8">
        {/* 왼쪽 영역 */}
        <section className="grid gap-4">
          {/* 매장명 */}
          <RegisterFormItemStructure label="매장명">
            <TextInput
              name="carwashName"
              type="text"
              value={inputs.carwashName}
              onChange={(e) => {
                onChange(e.target.name, e.target.value);
              }}
              placeholder="○○세차장"
            />
          </RegisterFormItemStructure>

          {/* 주소 */}
          <RegisterFormItemStructure label="주소">
            <DaumPostcodePicker
              value={inputs.carwashAddress}
              onChange={onChange}
            />
          </RegisterFormItemStructure>

          {/* 전화번호 */}
          <RegisterFormItemStructure label="전화번호">
            <TextInput
              name="carwashTel"
              type="tel"
              value={inputs.carwashTel}
              onChange={(e) => {
                onChange(e.target.name, e.target.value);
              }}
              placeholder="전화번호"
            />
          </RegisterFormItemStructure>

          {/* 30분 당 금액 */}
          <RegisterFormItemStructure label="30분 당 금액">
            <TextInput
              name="pricePer30min"
              type="number"
              value={inputs.pricePer30min}
              onChange={(e) => {
                onChange(e.target.name, e.target.value);
              }}
              placeholder="30분 당 금액"
            />
          </RegisterFormItemStructure>

          {/* 영업시간 */}
          <OpTimePicker
            weekdayOpenTime={inputs.weekdayOpenTime}
            weekdayCloseTime={inputs.weekdayCloseTime}
            weekendOpenTime={inputs.weekendOpenTime}
            weekendCloseTime={inputs.weekendCloseTime}
            onChange={onChange}
          />
        </section>

        {/* 오른쪽 영역 */}
        <section className="grid gap-4">
          {/*매장 사진*/}
          <ImageUploader value={inputs.carwashImage} onChange={onChange} />

          {/* 키포인트 */}
          <RegisterFormItemStructure label="키포인트">
            <KeyPointSelector
              value={inputs.keypoint}
              pointLabels={pointLabels}
              handleChange={onChange}
            />
          </RegisterFormItemStructure>

          {/* 매장 설명 */}
          <RegisterFormItemStructure label="매장 설명">
            <textarea
              className="block p-4 bg-gray-100 border border-gray-300 outline-none resize-none h-52 w-96 rounded-xl"
              name="carwashDescription"
              value={inputs.carwashDescription}
              onChange={(e) => {
                onChange(e.target.name, e.target.value);
              }}
              placeholder="매장 설명"
            />
          </RegisterFormItemStructure>
        </section>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center">
        <Button type="submit" style="long">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
