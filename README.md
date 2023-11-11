# README

# 서비스 소개

뽀득뽀득은 `셀프세차장 예약 서비스`입니다. 셀프세차장에 예약이라는 시스템을 더해 유저들에게 보장된 시간동안 여유롭게 즐기는 세차 경험을 주는 것을 목표로 합니다. 이를 통해 기다리는 뒷사람 눈치보지 않고, 개인 세차용품을 마음껏 사용하며 세차를 즐기는 환경을 만들어 나가고자 합니다.

# 코드의 재사용성

- 아토믹 패턴 고려 디자인
  저희 뽀득뽀득은 기획부터 아토믹 패턴을 고려하여 디자인 되었습니다. 가장 기초가 되는 Atom 컴포넌트를 Organism 레벨까지 적극적으로 활용하여 유저에게 일관된 디자인을 제공합니다. 특히 연령대가 높을 수 있는 사장님들에게 이러한 일관된 접근성을 높여줄 수 있습니다. 개발 중 이 컴포넌트는 어느 레벨에 위치시킬까 고민하는 시간을 줄이기 위해, 본격적인 개발에 들어가기 전 아토믹 패턴을 미리 정의해 두었습니다.
- 입점신청 폼 재사용
  최초로 사장님이 입점할 때, 운영 중 정보를 수정할 때 같은 입점신청 폼을 사용합니다. 특히 운영 중 정보를 수정할 때는 폼 오른쪽에 유저 입장에서 보이는 Mock 모바일 뷰가 렌더링됩니다. 입력 Input이 많은 특성 상 `onChange(”name”, value)` 형식으로 상태를 주입해주는 커스텀 훅 `useRegisterForm`을 만들어 사용했습니다.

# 객체 지향 설계 기반의 상태 관리

- 사장님의 이름, 로그인 상태 등을 전역으로 관리합니다. 사장님이 로그인하는 순간 로그인 상태가 리덕스 저장소에 업데이트됩니다. 상단 내비게이션 바 영역에 사장님의 이름을 표시해주어 화면을 보고 로그인 상태인지 알 수 있습니다. 가장 상위 컴포넌트인 레이아웃에서 매 페이지에 접속할 때마다 사장님의 로그인 상태를 감시하기 때문에, 다른 라이브러리를 쓰지 않고도 브라우저를 떠나는 여부와 상관 없이 항상 로그인 상태를 유지할 수 있습니다.
  ```json
  {
    "isLoggedIn": false,
    "isLoading": false,
    "userName": "",
    "error": null
  }
  ```
- 사장님이 자신의 운영중인 매장을 클릭하면 매장 주요 정보(세차장 이름, 세차장 ID, 운영시간)가 전역 상태로 관리됩니다. 이렇게 관리함으로써 하위 컴포넌트로 props가 파고드는 현상을 방지했습니다.
  ```json
  {
    "id": 0,
    "name": "",
    "monthlySales": 0,
    "monthlyReservations": 0,
    "optime": null,
    "bayReservationList": [],
    "isLoading": false,
    "error": null
  }
  ```

# 예외처리

예외처리를 하기 전, 예외가 발생할 수 있는 상황들에 대해 먼저 고민해 보았습니다. 그 결과, Query(GET)와 Mutation(POST, PUT, DELETE) 이렇게 두 종류의 예외로 구분하여 처리해야겠다고 생각했습니다.

Query의 경우는 리액트의 <ErrorBoundary />를 사용하여 값을 가져오는 데 예외가 발생하면 그것에 대해 대응할 수 있는 Fallback UI를 표시할 수 있게 처리했습니다.

Mutation의 경우는 useMutation의 onError 콜백을 통해 백엔드와 미리 정의한 에러코드를 바탕으로 분기처리 했습니다.

Mutation도 ErrorBoundary를 통해 예외 처리하지 않은 이유는, 사용자에게 더 친절한 에러를 보여주기 위함입니다. 오류가 발생해서 Query와 같이 Fallback UI로 화면을 덮어버린다면, 사용자 경험이 많이 떨어질 것 같다는 생각을 했습니다. 사용자가 직접 어떤 값을 추가하거나 삭제하는 명령에 에러가 발생한다면, 에러를 사용자에게 인지시킨 후 자발적으로 판단하여 다음 행동을 할 수 있게 메시지 창을 띄워줍니다.

# 성능 최적화

위에서 잠깐 언급한 입점신청 폼 오른쪽에 표시되는 모바일 UI에 아이콘들이 많이 사용됩니다.

# 주안점

- 백엔드 개발 일정으로부터 자유로운 프론트엔드 개발
  - 실제 API가 모두 개발되기 전, 미리 정의된 API 명세서를 바탕으로 Mock API를 만들어서 사용했습니다. 특히 카테캠 2단계에서 로그인 로직과 관련해서 많이 고생한 경험이 있어, 이번에는 그런 일을 방지하고자 로그인 API 부터 실제와 비슷하게 토큰을 반환하도록 만들었습니다.
  - 회원가입 Mock API도 마치 실제와 같이 유효성 검증 과정, 입력값에 따른 에러 객체를 던져주는 기능을 구현했습니다. 이렇게 실제와 가까웠던 Mock API를 통한 테스트 덕분에 백엔드와 맞춰보는 과정에서 시간을 많이 절약할 수 있었습니다.
  - 아래는 Mock 로그인, 회원가입 API의 예시입니다.
    ```jsx
    rest.post("/api/join/owner", (req, res, ctx) => {
      const { username, email, password, tel } = req.body;

      const regex = {
        email: /^\w[\w._%+-]+@\w[\w.-]+\.[a-zA-Z]{2,6}$/,
        password:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S*$/,
      };

      function validate(field, isValid, message) {
        if (!isValid) {
          return res(
            ctx.status(401),
            ctx.json({
              success: false,
              response: null,
              error: { message: message, status: 401 },
            })
          );
        }
      }

      const validators = [
        {
          field: "username",
          isValid: username && username.length >= 8 && username.length <= 45,
          message: "사용자 이름은 8-45자 사이여야 합니다.",
        },
        {
          field: "email",
          isValid: email && regex.email.test(email),
          message: "이메일 형식으로 작성해주세요.",
        },
        {
          field: "password",
          isValid:
            password &&
            regex.password.test(password) &&
            password.length >= 8 &&
            password.length <= 45,
          message: "비밀번호 형식이 올바르지 않습니다.",
        },
        {
          field: "tel",
          isValid: tel && tel.length >= 9 && tel.length <= 14,
          message: "전화번호 형식이 올바르지 않습니다.",
        },
      ];

      for (const { field, isValid, message } of validators) {
        const response = validate(field, isValid, message);
        if (response) return response;
      }

      return res(ctx.json({ success: true, response: null, error: null }));
    }),

    // 로그인
    rest.post("/api/login/owner", (req, res, ctx) => {
      const { email, password } = req.body;

      if (email !== "owner@nate.com" || password !== "owner1234!") {
        return res(
          ctx.status(401),
          ctx.json({
            success: false,
            response: null,
            error: "인증에 실패했습니다.",
          })
        );
      }

      const token =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FyQG5hdGUuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlkIjoxLCJleHAiOjE2ODcwNTM5MzV9.fXlD0NZQXYYfPHV8rokRJTM86nhS869LZ1KIGi7_qvPOcVbXgvyZLKvnlLxomIiS3YFnQRLzXAJ2G41yI_AmG1";

      return res(
        ctx.set("Authorization", token),
        ctx.status(200),
        ctx.json({
          success: true,
          response: null,
          error: null,
        })
      );
    }),
    ```
