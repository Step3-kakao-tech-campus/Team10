import Button from "../atoms/Button";
import Box from "../atoms/Box";
import Image from "../atoms/Image";
import Logo from "/logo.svg";
import TextInput from "../atoms/TextInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/user";

/**
 * LoginForm 로그인 폼
 *
 * 이메일, 비밀번호 입력창, 로그인 버튼, 회원가입 링크를 담고 있는 박스입니다.
 *
 * @todo 로그인에 실패했을 때 에러처리 (form onSubmit 부분)
 * @todo 로그인 시 즉시 메인 페이지로 이동하는데, 이 부분에서 localStorage에 토큰을 저장하는 로직 필요
 */
const LoginForm = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      login(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <Box className="grid p-14 gap-14">
      <Image className="flex justify-center" src={Logo} />

      <form
        noValidate
        className="grid gap-4"
        onSubmit={handleSubmit((data) => {
          mutation.mutate(data, {
            onSuccess: () => {
              navigate("/");
            },
            onError: (error) => {
              // TODO: 로그인에 실패했을 때 에러 처리
              console.log(error);
            },
          });
        })}>
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
