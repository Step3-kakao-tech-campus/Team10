import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import Box from "../atoms/Box";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../apis/user";
import { useNavigate } from "react-router-dom";

/**
 * SignupForm 회원가입 폼
 *
 * 닉네임, 이메일, 비밀번호, 비밀번호 확인, 전화번호 입력창, 회원가입 버튼을 담고 있는 박스입니다.
 *
 * @todo 닉네임, 이메일 중복체크 API 추가 (백엔드와 협의)
 * @todo 회원가입에 실패했을 때 에러처리 (form onSubmit 부분)
 * @todo 닉네임 -> 이름으로 수정
 * @todo 회원가입 시 즉시 로그인되어 메인 페이지로 이동하는데, 이 부분에서 localStorage에 토큰을 저장하는 로직 필요
 * @todo isSubmitting 상태에 따라 회원가입 버튼 스타일 변경 필요
 */
const SignupForm = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      signup(data);
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm();

  const PATTERNS = {
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/,
  };

  const MESSAGES = {
    nickname: {
      required: "닉네임을 입력해주세요.",
      pattern: "닉네임은 2자 이상 8자 이하, 영어 또는 한글로 입력해주세요.",
    },
    email: {
      required: "이메일을 입력해주세요.",
      pattern: "이메일 형식에 맞지 않습니다.",
    },
    password: {
      required: "비밀번호를 입력해주세요.",
      pattern:
        "비밀번호는 영문, 숫자, 특수기호 조합 8자리 이상으로 입력해주세요.",
    },
    passwordConfirm: {
      required: "비밀번호를 입력해주세요.",
      mismatch: "비밀번호가 일치하지 않습니다.",
    },
    tel: {
      required: "전화번호를 입력해주세요.",
    },
  };

  return (
    <Box className="grid p-14 gap-14">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>

      <form
        noValidate
        className="grid gap-4"
        onSubmit={handleSubmit(async (data) => {
          mutation.mutate(data, {
            onSuccess: () => {
              navigate("/");
            },
            onError: (error) => {
              // TODO: 회원가입에 실패했을 때 에러 처리
              console.log(error);
            },
          });
        })}>
        <div className="flex gap-4 w-96">
          <TextInput
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: MESSAGES.nickname.required,
              pattern: {
                value: PATTERNS.nickname,
                message: MESSAGES.nickname.pattern,
              },
            })}
          />
          <Button className="shrink-0" style="small">
            중복체크
          </Button>
        </div>
        {errors.nickname && (
          <small className="text-red-500" role="alert">
            {errors.nickname.message}
          </small>
        )}

        <div className="flex gap-4 w-96">
          <TextInput
            type="email"
            placeholder="이메일"
            {...register("email", {
              required: MESSAGES.email.required,
              pattern: {
                value: PATTERNS.email,
                message: MESSAGES.email.pattern,
              },
            })}
          />
          <Button className="shrink-0" style="small">
            중복체크
          </Button>
        </div>
        {errors.email && (
          <small className="text-red-500" role="alert">
            {errors.email.message}
          </small>
        )}

        <TextInput
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: MESSAGES.password.required,
            pattern: {
              value: PATTERNS.password,
              message: MESSAGES.password.pattern,
            },
          })}
        />
        {errors.password && (
          <small className="text-red-500" role="alert">
            {errors.password.message}
          </small>
        )}
        <TextInput
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm", {
            required: MESSAGES.passwordConfirm.required,
            validate: {
              check: (value) => {
                if (getValues("password") !== value) {
                  return MESSAGES.passwordConfirm.mismatch;
                }
              },
            },
          })}
        />
        {errors.passwordConfirm && (
          <small className="text-red-500" role="alert">
            {errors.passwordConfirm.message}
          </small>
        )}

        <TextInput
          type="tel"
          placeholder="전화번호"
          {...register("tel", {
            required: MESSAGES.tel.required,
          })}
        />
        {errors.tel && (
          <small className="text-red-500" role="alert">
            {errors.tel.message}
          </small>
        )}

        <Button type="submit" disabled={isSubmitting} style="long">
          회원가입
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
