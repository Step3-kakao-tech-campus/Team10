import { rest } from "msw";
import { home } from "./responses/home";
import { carwashes } from "./responses/carwashes";
import { revenue } from "./responses/revenue";

export const handlers = [
  // 회원가입
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
  // 매장 정보 수정(기존 정보 가져오기)
  rest.get("/api/owner/carwashes/:carwash_id/details", (req, res, ctx) => {
    const carwash_id = req.params;
    // carwash_id로 특정 세차장 가져오는 코드 추가하기
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          id: carwash_id,
          image: [
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/16b2ae1e-d904-48fc-b1e2-660b38c25c3f",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/fdb8f53b-08eb-4b35-8b89-0394473c2d7b",
          ],
          name: "포세이돈워시 용봉점",
          price: "5000",
          tel: "062-000-0000",
          location: {
            placeName: "포세이돈워시 용봉점",
            address: "광주 북구 용봉동 230",
          },
          bayCnt: "4",
          optime: {
            weekday: {
              start: "09:00:00",
              end: "17:00:00",
            },
            weekend: {
              start: "10:00:00",
              end: "16:00:00",
            },
            keypointId: [1, 3],
            des: "포세이돈워시에 오신 것을 환영합니다.",
          },
          error: null,
        },
      })
    );
  }),

  // 매장 정보 수정
  // 백엔드 단에서 Validation 필요함
  rest.put("/api/owner/carwashes/:carwash_id/details", (req, res, ctx) => {
    const carwash_id = req.params;
    const token = req.headers.get("Authorization");
    const modifiedInfo = req.body;

    console.log("수정된 세차장 정보: ", modifiedInfo);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, response: null, error: null })
    );
  }),

  // 입점신청
  // 사진 업로드는 multipart/form-data
  rest.post("/api/owner/carwashes/register", (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const formData = req.body;

    console.log("입점신청 정보: ", formData);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, response: null, error: null })
    );
  }),

  // 베이 추가
  rest.post("/api/owner/carwashes/:carwash_id/bays", (req, res, ctx) => {
    const carwash_id = req.params;
    const token = req.headers.get("Authorization");

    const bayInfo = req.body;

    console.log("추가한 베이 정보: ", bayInfo);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, response: null, error: null })
    );
  }),

  // 베이 활성화/비활성화
  rest.put("/api/owner/bays/:bay_id", (req, res, ctx) => {
    const bay_id = req.params;
    const status = req.url.searchParams.get("status");
    const token = req.headers.get("Authorization");

    console.log("변경된 베이 상태: ", status);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ success: true, response: null, error: null })
    );
  }),

  // 매장 관리 - owner 별
  rest.get("/api/owner/carwashes", (req, res, ctx) => {
    const token = req.headers.get("Authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(ctx.status(200), ctx.json(carwashes));
  }),

  // 매출관리 페이지
  rest.get("/api/owner/sales", (req, res, ctx) => {
    const selected_date = req.url.searchParams.get("selected-date");
    const carwash_id = req.url.searchParams.get("carwash-id");

    const token = req.headers.get("Authorization");

    console.log("selected_date: ", selected_date);
    console.log("carwash_id: ", carwash_id);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          carwashList: [
            {
              carwashId: 2,
              name: "하이세차장",
            },
            {
              carwashId: 3,
              name: "세차장",
            },
          ],
          response: [
            {
              reservation: {
                reservationId: 138,
                bayNo: 2,
                nickname: "imnewuser",
                totalPrice: 4000,
                startTime: "2023-10-18T11:40",
                endTime: "2023-10-18T12:10",
              },
              carwash: {
                carwashId: 3,
                name: "세차장",
              },
            },
          ],
        },
        error: null,
      })
    );
  }),

  // 매장 관리 - 세차장 별
  rest.get("/api/owner/carwashes/:carwash_id", (req, res, ctx) => {
    const carwash_id = req.params.carwash_id;
    const token = req.headers.get("Authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          id: 2,
          name: "용봉세차타운",
          optime: {
            weekday: {
              start_time: "06:00:00",
              end_time: "22:00:00",
            },
            weekend: {
              start_time: "06:00:00",
              end_time: "23:00:00",
            },
          },
          monthly_sales_by_store: 450000,
          monthly_reservation_by_store: 45,
          bay_list: [
            {
              bay_id: 12,
              bay_no: 8,
              status: 1,
              bay_bookedTime: [
                // 전날 오후 11시 ~ 오늘 오전 2시
                {
                  start_time: "2023-10-15T23:00:00",
                  end_time: "2023-10-16T02:00:00",
                },
                {
                  start_time: "2023-10-16T07:00:00",
                  end_time: "2023-10-16T09:00:00",
                },
                {
                  start_time: "2023-10-16T04:00:00",
                  end_time: "2023-10-16T06:00:00",
                },
                {
                  start_time: "2023-10-16T20:00:00",
                  end_time: "2023-10-16T21:00:00",
                },
                {
                  start_time: "2023-10-16T19:00:00",
                  end_time: "2023-10-16T20:00:00",
                },
                // 오늘 오후 11시 ~ 다음날 오전 1시 30분
                {
                  start_time: "2023-10-16T23:00:00",
                  end_time: "2023-10-17T01:30:00",
                },
              ],
            },
            {
              bay_id: 13,
              bay_no: 9,
              status: 0,
              bay_bookedTime: [
                {
                  start_time: "2023-10-16T19:00:00",
                  end_time: "2023-10-16T20:00:00",
                },
                {
                  start_time: "2023-10-16T20:00:00",
                  end_time: "2023-10-16T21:00:00",
                },
              ],
            },
          ],
        },
        error: null,
      })
    );
  }),

  // 총 매출 금액 조회
  rest.get("/api/owner/revenue", (req, res, ctx) => {
    const selected_date = req.url.searchParams.get("selected-date");
    const carwash_id = req.url.searchParams.get("carwash-id");

    const token = req.headers.get("Authorization");

    console.log("selected_date: ", selected_date);
    console.log("carwash_id: ", carwash_id);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(ctx.status(200), ctx.json({ revenue }));
  }),

  // 사장님 홈
  rest.get("/api/owner/home", (req, res, ctx) => {
    const token = req.headers.get("Authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(ctx.status(200), ctx.json(home));
  }),

  // 예약 취소
  rest.delete("/api/reservations/:reservation_id", (req, res, ctx) => {
    const reservation_id = req.params.reservation_id;
    const token = req.headers.get("Authorization");

    console.log("취소할 예약 번호: ", reservation_id);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(ctx.status(200));
  }),

  rest.post("/api/user/check", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 예약 목록 조회 - 세차장별 (베이별)
  rest.get("/api/owner/reservation/:carwash_id/:bay_id", (req, res, ctx) => {
    const carwash_id = req.params.carwash_id;
    const bay_id = req.params.bay_id;
    const token = req.headers.get("Authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          reservationList: [
            {
              reservation: {
                reservationId: 138,
                bayNo: 2,
                bayId: 1,
                nickname: "imnewuser",
                totalPrice: 4000,
                startTime: "2023-10-18T11:40",
                endTime: "2023-10-18T12:10",
              },
              carwash: {
                carwashId: 3,
                name: "ㅇㅇ세차장",
              },
            },
            {
              reservation: {
                reservationId: 138,
                bayNo: 2,
                bayId: 1,
                nickname: "imnewuser",
                totalPrice: 4000,
                startTime: "2023-10-18T11:40",
                endTime: "2023-10-18T12:10",
              },
              carwash: {
                carwashId: 3,
                name: "ㅇㅇ세차장",
              },
            },
            {
              reservation: {
                reservationId: 138,
                bayNo: 2,
                bayId: 1,
                nickname: "imnewuser",
                totalPrice: 4000,
                startTime: "2023-10-18T11:40",
                endTime: "2023-10-18T12:10",
              },
              carwash: {
                carwashId: 3,
                name: "ㅇㅇ세차장",
              },
            },
          ],
        },
        error: null,
      })
    );
  }),
];

// "reservationList":[
//   {
//       "reservation": {
//           "reservationId":138,
//           "bayNo": 2,
//           "bayId": 1,
//           "nickname":"imnewuser",
//           "totalPrice":4000,
//           "startTime":"2023-10-18T11:40",
//           "endTime":"2023-10-18T12:10"
//       },
//       "carwash": {
//           "carwashId": 3,
//           "name": 세차장
//       }
//   }
// ]
