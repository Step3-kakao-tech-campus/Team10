import Button from "../atoms/Button";
import Box from "../atoms/Box";
import Image from "../atoms/Image";
import Logo from "/logo.svg";
import TextInput from "../atoms/TextInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const navigate = useNavigate();

  return (
    <Box className="grid p-14 gap-14">
      <Image className="flex justify-center" src={Logo} />

      <form
        noValidate
        className="grid gap-4"
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
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
