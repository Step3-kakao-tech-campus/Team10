import React, { useState } from "react";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import TextArea from "../atoms/TextArea";
import Box from "../atoms/Box";
import TimeSelector from "../molecules/TimeSelector";
import FileUploader from "../molecules/FileUploader";
import KeyPointSelector from "../molecules/KeyPointSelector";
import { useForm } from "react-hook-form";
import Checkbox from "../atoms/CheckBox";

const RegisterForm = () => {
  const [weekday24hrs, setWeekday24hrs] = useState(false);
  const [weekend24hrs, setWeekend24hrs] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      weekdayStartTime: "09:00",
      weekdayEndTime: "18:00",
      weekendStartTime: "09:00",
      weekendEndTime: "18:00",
    },
  });

  const [selectedPoints, setSelectedPoints] = useState([]);
  const pointLabels = [
    "하부세차",
    "개러지형 독립공간",
    "야간조명",
    "100% 수돗물",
    "휴게실",
    "에어컨",
    "발수코팅건",
  ];

  return (
    <Box className="grid gap-8 p-14">
      {/*제목 텍스트*/}
      <div className="grid gap-4 text-center">
        <h1 className="text-3xl font-bold">입점을 환영합니다!</h1>
        <div className="text-gray-500">아래 정보들을 입력해주세요.</div>
      </div>

      <form
        className="grid gap-8"
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
        })}>
        {/* Wrapper */}
        <div className="flex gap-8">
          <section className="grid gap-4">
            {/* 매장명 */}
            <div className="grid gap-2">
              <label htmlFor="carwashName" className="text-gray-700">
                매장명
              </label>
              <TextInput
                id="carwashName"
                type="text"
                placeholder="○○세차장"
                {...register("carwashName")}
              />
            </div>
            {/* 주소 */}
            <div className="grid gap-2">
              <label htmlFor="carwashAddress" className="text-gray-700">
                주소
              </label>
              <TextInput
                id="carwashAddress"
                type="text"
                placeholder="주소"
                {...register("carwashAddress")}
              />
            </div>
            {/* 전화번호 */}
            <div className="grid gap-2">
              <label htmlFor="carwashTel" className="text-gray-700">
                전화번호
              </label>
              <TextInput
                id="carwashTel"
                type="tel"
                placeholder="전화번호"
                {...register("carwashTel")}
              />
            </div>
            {/* 30분 당 금액 */}
            <div className="grid gap-2">
              <label htmlFor="pricePer30min" className="text-gray-700">
                30분 당 금액
              </label>
              <TextInput
                id="pricePer30min"
                type="number"
                placeholder="30분 당 금액"
                {...register("pricePer30min")}
              />
            </div>
            {/* 영업시간 */}
            <div className="grid gap-2">
              <div className="flex justify-between w-96">
                <label className="text-gray-700">영업시간</label>
                <Checkbox>24시간 영업</Checkbox>
              </div>
              {/* 평일 */}
              <div className="flex items-center gap-2 w-96">
                <label className="text-gray-700 shrink-0">평일</label>
                <TextInput
                  type="time"
                  step="1800"
                  placeholder="시작시간"
                  {...register("weekdayStartTime")}
                />
                {"~"}
                <TextInput
                  type="time"
                  step="1800"
                  placeholder="마감시간"
                  {...register("weekdayEndTime")}
                />
              </div>
              <div className="flex justify-end w-96">
                <Checkbox>24시간 영업</Checkbox>
              </div>
              <div className="flex items-center gap-2 w-96">
                <label className="text-gray-700 shrink-0">주말</label>
                <TextInput
                  type="time"
                  step="1800"
                  placeholder="시작시간"
                  {...register("weekendStartTime")}
                />
                {"~"}
                <TextInput
                  type="time"
                  step="1800"
                  placeholder="마감시간"
                  {...register("weekendEndTime")}
                />
              </div>
            </div>
          </section>
          <section className="grid gap-4">
            {/*매장 사진*/}
            <div>
              <FileUploader />
            </div>
            {/*키포인트*/}
            <div className="">
              <label className="text-base text-gray-700 text-start">
                키포인트
              </label>
              <KeyPointSelector
                pointLabels={pointLabels}
                selectedPoints={selectedPoints}
              />
            </div>
            {/*매장 설명*/}
            <div className="grid gap-2">
              <label htmlFor="carwashDescription" className="text-gray-700">
                매장 설명
              </label>
              <textarea
                className="block p-4 text-black bg-gray-100 border border-gray-300 outline-none resize-none w-96 h-44 rounded-xl"
                id="carwashDescription"
                placeholder="매장 설명"
                {...register("carwashDescription")}></textarea>
            </div>
          </section>
        </div>
        <div className="flex justify-center">
          <Button type="submit" style="long">
            입점신청
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default RegisterForm;
