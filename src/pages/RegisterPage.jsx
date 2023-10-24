import React from "react";
import RegisterForm from "../components/organisms/RegisterForm";
import Box from "../components/atoms/Box";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../apis/carwashes";

const RegisterPage = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      postRegister(data);
    },
  });

  const defaultValue = {
    carwashName: "",
    carwashAddress: "",
    carwashTel: "",
    pricePer30min: "",
    weekdayOpenTime: "",
    weekdayCloseTime: "",
    weekendOpenTime: "",
    weekendCloseTime: "",
    carwashImage: [],
    keypoint: [],
    carwashDescription: "",
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Box className="grid gap-8 p-14">
        {/*제목 텍스트*/}
        <div className="grid gap-4 text-center">
          <h1 className="text-3xl font-bold">입점을 환영합니다!</h1>
          <div className="text-gray-500">아래 정보들을 입력해주세요.</div>
        </div>
        <RegisterForm defaultValue={defaultValue} mutation={mutation} />
      </Box>
    </div>
  );
};

export default RegisterPage;
