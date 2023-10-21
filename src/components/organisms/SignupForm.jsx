import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import Box from "../atoms/Box";
import { useForm } from "react-hook-form";

const SignupForm = () => {
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
          await new Promise((r) => setTimeout(r, 1000));
          alert(JSON.stringify(data));
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
