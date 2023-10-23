import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import Box from "../atoms/Box";
import KeyPointSelector from "../molecules/KeyPointSelector";
import Checkbox from "../atoms/CheckBox";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../apis/carwashes";

/**
 * RegisterForm
 *
 * 세차장 입점신청 폼입니다.
 *
 * @todo 각 input에 대한 validation 필요
 * @todo 매장사진 가로 스크롤 항상 표시되도록 수정 필요
 * @toto 매장 사진 required 처리 필요
 * @todo Organism에서 Template으로 격상 필요
 * @todo 복잡한 로직은 컴포넌트로 분리 필요(운영시간, 매장사진, 키포인트)
 * @todo isSubmitting 상태에 따라 입점신청 버튼 스타일 변경 필요
 */
const RegisterForm = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      postRegister(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  const [weekday24hrs, setWeekday24hrs] = useState(false);
  const [weekend24hrs, setWeekend24hrs] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [openPostcode, setOpenPostcode] = useState(false);

  // 리렌더링 시마다 변수가 초기화되는 현상을 방지하기 위해 useRef 사용
  const dataTransfer = useRef(new DataTransfer());

  const MESSAGES = {
    common: {
      required: "필수 입력입니다.",
    },
  };

  const handleChangeData = (e) => {
    const files = e.target.files;

    // input을 통해 업로드 된 파일들을 dataTransfer에 추가하고
    // 이미지 미리보기를 위해 imagePreview 상태에 업데이트
    Array.from(files).forEach((file) => {
      dataTransfer.current.items.add(file);
      setImagePreview((prev) => {
        return [...prev, URL.createObjectURL(file)];
      });
    });

    // dataTransfer에 추가된 파일들을 폼 상태에 업데이트
    setValue("carwashImage", dataTransfer.current.files);
  };

  const handleClickDelete = (e, index) => {
    e.stopPropagation();
    const tmpImagePreview = [...imagePreview];
    tmpImagePreview.splice(index, 1);

    dataTransfer.current.items.remove(index);
    setValue("carwashImage", dataTransfer.current.files);
    setImagePreview(tmpImagePreview);
  };

  const handleClickImage = (index) => {
    if (index !== 0) {
      // 상태 업데이트
      const tmpImagePreview = [...imagePreview];

      tmpImagePreview.unshift(tmpImagePreview[index]);
      tmpImagePreview.splice(index + 1, 1);

      setImagePreview(tmpImagePreview);

      // "carwashImage" value 업데이트
      const tmpDataTransfer = new DataTransfer();

      for (const file of dataTransfer.current.files) {
        tmpDataTransfer.items.add(file);
      }

      dataTransfer.current.items.clear();
      dataTransfer.current.items.add(tmpDataTransfer.files[index]);
      tmpDataTransfer.items.remove(index);

      for (const file of tmpDataTransfer.files) {
        dataTransfer.current.items.add(file);
      }

      setValue("carwashImage", dataTransfer.current.files);
    }
  };

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
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data, {
            onSuccess: () => {
              navigate("/");
            },
            onError: (error) => {
              // TODO: 입점신청 실패 시 에러 처리 필요
              console.log(error);
            },
          });
        })}>
        {/* Wrapper */}
        <div className="flex gap-8">
          {/* 왼쪽 영역 */}
          <section className="grid gap-4">
            {/* 매장명 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="carwashName" className="text-gray-700">
                  매장명
                </label>
                {errors.carwashName && (
                  <small className="text-red-500" role="alert">
                    {errors.carwashName.message}
                  </small>
                )}
              </div>
              <TextInput
                id="carwashName"
                type="text"
                placeholder="○○세차장"
                {...register("carwashName", {
                  required: MESSAGES.common.required,
                })}
              />
            </div>
            {/* 주소 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="carwashAddress" className="text-gray-700">
                  주소
                </label>
                {errors.carwashAddress && (
                  <small className="text-red-500" role="alert">
                    {errors.carwashAddress.message}
                  </small>
                )}
              </div>
              <div className="relative flex gap-4 w-96">
                <TextInput
                  id="carwashAddress"
                  type="text"
                  placeholder="주소"
                  disabled={true}
                  {...register("carwashAddress", {
                    required: MESSAGES.common.required,
                  })}
                />
                <Button
                  onClick={() => {
                    setOpenPostcode((current) => !current);
                  }}
                  className="shrink-0"
                  style="small">
                  주소검색
                </Button>
                {openPostcode && (
                  <div className="absolute z-50 overflow-auto bg-white border w-96 rounded-xl">
                    <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
                      <div>주소검색</div>
                      <Button
                        className="text-xl"
                        onClick={() => {
                          setOpenPostcode(false);
                        }}>
                        ✕
                      </Button>
                    </div>
                    <DaumPostcode
                      onComplete={(data) => {
                        setValue("carwashAddress", data.address);
                        setOpenPostcode(false);
                      }}
                      autoClose={false}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* 전화번호 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="carwashTel" className="text-gray-700">
                  전화번호
                </label>
                {errors.carwashTel && (
                  <small className="text-red-500" role="alert">
                    {errors.carwashTel.message}
                  </small>
                )}
              </div>
              <TextInput
                id="carwashTel"
                type="tel"
                placeholder="전화번호"
                {...register("carwashTel", {
                  required: MESSAGES.common.required,
                })}
              />
            </div>
            {/* 30분 당 금액 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="pricePer30min" className="text-gray-700">
                  30분 당 금액
                </label>
                {errors.pricePer30min && (
                  <small className="text-red-500" role="alert">
                    {errors.pricePer30min.message}
                  </small>
                )}
              </div>
              <TextInput
                id="pricePer30min"
                type="number"
                placeholder="30분 당 금액"
                {...register("pricePer30min", {
                  required: MESSAGES.common.required,
                })}
              />
            </div>

            {/* 영업시간 */}
            <div className="grid gap-2">
              <div className="flex justify-between w-96">
                <label className="text-gray-700">영업시간</label>
                {(errors.weekdayOpenTime ||
                  errors.weekdayCloseTime ||
                  errors.weekendOpenTime ||
                  errors.weekendCloseTime) && (
                  <small className="text-red-500" role="alert">
                    필수 입력입니다.
                  </small>
                )}
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWeekday24hrs(true);
                      setValue("weekdayOpenTime", new Date(0, 0, 0, 0, 0));
                      setValue("weekdayCloseTime", new Date(0, 0, 0, 23, 59));
                    } else {
                      setWeekday24hrs(false);
                    }
                  }}>
                  24시간 영업
                </Checkbox>
              </div>
              <div className="flex items-center gap-2 w-96">
                <label className="text-gray-700 shrink-0">평일</label>
                <Controller
                  control={control}
                  name="weekdayOpenTime"
                  rules={{ required: MESSAGES.common.required }}
                  render={({ field }) => (
                    <DatePicker
                      className="w-40 p-4 bg-gray-100 border border-gray-300 outline-none h-14 rounded-xl disabled:opacity-30"
                      dateFormat="h:mm aa"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="시작 시간"
                      disabled={weekday24hrs}
                    />
                  )}
                />
                {"~"}
                <Controller
                  control={control}
                  name="weekdayCloseTime"
                  rules={{ required: MESSAGES.common.required }}
                  render={({ field }) => (
                    <DatePicker
                      className="w-40 p-4 bg-gray-100 border border-gray-300 outline-none h-14 rounded-xl disabled:opacity-30"
                      dateFormat="h:mm aa"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="종료 시간"
                      disabled={weekday24hrs}
                    />
                  )}
                />
              </div>
              <div className="flex justify-end w-96">
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWeekend24hrs(true);
                      setValue("weekendOpenTime", new Date(0, 0, 0, 0, 0));
                      setValue("weekendCloseTime", new Date(0, 0, 0, 23, 59));
                    } else {
                      setWeekend24hrs(false);
                    }
                  }}>
                  24시간 영업
                </Checkbox>
              </div>
              <div className="flex items-center gap-2 w-96">
                <label className="text-gray-700 shrink-0">주말</label>
                <Controller
                  control={control}
                  name="weekendOpenTime"
                  rules={{ required: MESSAGES.common.required }}
                  render={({ field }) => (
                    <DatePicker
                      className="w-40 p-4 bg-gray-100 border border-gray-300 outline-none h-14 rounded-xl disabled:opacity-30"
                      dateFormat="h:mm aa"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="시작 시간"
                      disabled={weekend24hrs}
                    />
                  )}
                />
                {"~"}
                <Controller
                  control={control}
                  name="weekendCloseTime"
                  rules={{ required: MESSAGES.common.required }}
                  render={({ field }) => (
                    <DatePicker
                      className="w-40 p-4 bg-gray-100 border border-gray-300 outline-none h-14 rounded-xl disabled:opacity-30"
                      dateFormat="h:mm aa"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="종료 시간"
                      disabled={weekend24hrs}
                    />
                  )}
                />
              </div>
            </div>
          </section>

          {/* 오른쪽 영역 */}
          <section className="grid gap-4">
            {/*매장 사진*/}
            <div className="grid gap-2">
              <label
                htmlFor="carwashImage"
                className="flex justify-between text-gray-700">
                <div>매장사진</div>

                <Button
                  onClick={() => {
                    document.getElementById("carwashImage").click();
                  }}
                  style="addPhoto">
                  + 추가
                </Button>
              </label>
              <input
                type="file"
                accept="image/*"
                id="carwashImage"
                hidden
                {...register("carwashImage", {
                  onChange: handleChangeData,
                })}
              />
              <div className="flex gap-4 p-4 overflow-x-auto overflow-y-hidden bg-gray-100 border border-gray-300 outline-none w-96 rounded-xl h-28">
                {imagePreview
                  ? imagePreview.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="relative w-20 h-20 overflow-auto shrink-0 rounded-xl"
                          onClick={() => {
                            handleClickImage(index);
                          }}>
                          <img
                            className="absolute object-cover w-full h-full"
                            src={item}
                            alt={`미리보기 ${index}}`}
                          />
                          {index === 0 ? (
                            <div className="absolute bottom-0 w-full p-1 text-xs text-center text-white bg-primary font-semobold">
                              프로필
                            </div>
                          ) : null}
                          <Button
                            style="deletePhoto"
                            onClick={(e) => handleClickDelete(e, index)}
                            className="absolute top-1 right-1">
                            ✕
                          </Button>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            {/* 키포인트 */}
            <div className="grid gap-2">
              <label className="text-gray-700">키포인트</label>
              {/* <div className="p-4 bg-gray-100 border border-gray-300 outline-none w-96 rounded-xl">
                <div className="flex flex-wrap justify-center gap-4"></div>
              </div> */}
              <KeyPointSelector
                pointLabels={pointLabels}
                control={control}
                name="keypoint"
              />
            </div>
            {/* 매장 설명 */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="carwashDescription" className="text-gray-700">
                  매장 설명
                </label>
                {errors.carwashDescription && (
                  <small className="text-red-500" role="alert">
                    {errors.carwashDescription.message}
                  </small>
                )}
              </div>
              <textarea
                className="block p-4 bg-gray-100 border border-gray-300 outline-none resize-none h-52 w-96 rounded-xl"
                id="carwashDescription"
                placeholder="매장 설명"
                {...register("carwashDescription", {
                  required: MESSAGES.common.required,
                })}></textarea>
            </div>
          </section>
        </div>

        {/* 하단 버튼 */}
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
