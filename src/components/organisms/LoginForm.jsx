import Button from "../atoms/Button";
import Box from "../atoms/Box";
import Image from "../atoms/Image";
import Logo from "/logo.svg";
import TextInput from "../atoms/TextInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginThunk } from "../../store/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useState } from "react";

/**
 * LoginForm 로그인 폼
 *
 * 이메일, 비밀번호 입력창, 로그인 버튼, 회원가입 링크를 담고 있는 박스입니다.
 *
 * @todo errorMessage를 react-hook-form의 에러 메시지로 변경 필요
 */
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginThunk(data));
      unwrapResult(resultAction); // loginThunk가 무조건 success를 반환하므로, unwrapResult를 사용하여 resultAction을 반환합니다.
      navigate("/");
    } catch (error) {
      setErrorMessage(error.error);
    }
  };

  return (
    <Box className="grid p-14 gap-14">
      <Image className="flex justify-center" src={Logo} />

      <form noValidate className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일은 필수 입력힙니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && (
          <small className="text-red-500" role="alert">
            {errors.email.message}
          </small>
        )}

        <TextInput
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
          })}
        />
        {errors.password && (
          <small className="text-red-500" role="alert">
            {errors.password.message}
          </small>
        )}

        {errorMessage && (
          <small className="text-red-500" role="alert">
            {errorMessage}
          </small>
        )}

        <Button type="submit" disabled={isSubmitting} style="long">
          로그인
        </Button>

        <Button
          style="longwhite"
          onClick={() => {
            navigate("/signup");
          }}>
          회원가입
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
