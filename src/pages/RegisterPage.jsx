import React from "react";
import RegisterForm from "../components/organisms/RegisterForm";
import Box from "../components/atoms/Box";
import { useMutation } from "@tanstack/react-query";
import { register } from "../apis/carwashes";
import useRegisterForm from "../hooks/useRegisterForm";

const RegisterPage = () => {
  const mutation = useMutation({
    mutationFn: (inputs) => {
      const formData = new FormData();
      inputs.carwashImage.forEach((file) => {
        formData.append("images", file);
      });

      formData.append(
        "carwash",
        JSON.stringify({
          name: inputs.carwashName,
          region: {
            placeName: inputs.carwashName,
            address: inputs.carwashAddress,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
          },
          price: inputs.pricePer30min,
          optime: {
            weekday: {
              start: inputs.weekdayOpenTime,
              end: inputs.weekdayCloseTime,
            },
            weekend: {
              start: inputs.weekendOpenTime,
              end: inputs.weekendCloseTime,
            },
          },
          keywordId: inputs.keypoint,
          description: inputs.carwashDescription,
          tel: inputs.carwashTel,
        })
      );

      return register(formData);
    },
  });

  const initialValue = {
    carwashName: "",
    carwashAddress: "",
    latitude: "",
    longitude: "",
    carwashTel: "",
    pricePer30min: "",
    weekdayOpenTime: "",
    weekdayCloseTime: "",
    weekendOpenTime: "",
    weekendCloseTime: "",
    keypoint: [],
    carwashImage: [],
    carwashDescription: "",
  };

  const [inputs, handleChange] = useRegisterForm(initialValue);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Box className="grid gap-8 p-14">
        {/*제목 텍스트*/}
        <div className="grid gap-4 text-center">
          <h1 className="text-3xl font-bold">입점을 환영합니다!</h1>
          <div className="text-gray-500">아래 정보들을 입력해주세요.</div>
        </div>
        <RegisterForm
          inputs={inputs}
          onChange={handleChange}
          mutation={mutation}
          buttonLabel="입점신청"
        />
      </Box>
    </div>
  );
};

export default RegisterPage;
