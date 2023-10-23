import { rest } from "msw";
import { home } from "./responses/home";
import { carwashes } from "./responses/carwashes";
import { carwashesDetails } from "./responses/carwashesDetails";
import { revenue } from "./responses/revenue";
import { sales } from "./responses/sales";

export const handlers = [
  // *********** GET ***********
  // 사장님 홈
  rest.get("/owner/home", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(home));
  }),

  // 매장 관리 - owner 별
  rest.get("/owner/carwashes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(carwashes));
  }),

  // 매장 정보 수정(기존 정보 가져오기)
  rest.get("/owner/carwashes/:carwash_id/details", (req, res, ctx) => {
    const carwash_id = req.params.carwash_id;
    // carwash_id로 특정 세차장 가져오는 코드 추가하기
    return res(ctx.status(200), ctx.json(carwashesDetails));
  }),

  // 매출관리 페이지
  rest.get("/owner/sales", (req, res, ctx) => {
    const selected_date = req.url.searchParams.get("selected-date");
    const carwash_id = req.url.searchParams.get("carwash-id");
    return res(ctx.status(200), ctx.json({ sales }));
  }),

  rest.get("/owner/carwashes/:carwash_id", (req, res, ctx) => {
    const carwash_id = req.params.carwash_id;
    // carwash_id로 특정 세차장 가져오는 코드 추가하기
    if (req.body) {
      return res(ctx.status(200), ctx.json(carwashesDetails));
    }
  }),

  // 총 매출 금액 조회
  rest.get("/owner/revenue", (req, res, ctx) => {
    const selected_date = req.url.searchParams.get("selected-date");
    const carwash_id = req.url.searchParams.get("carwash-id");
    return res(ctx.status(200), ctx.json({ revenue }));
  }),

  // *********** POST ***********
  // 로그인
  rest.post("/login/owner", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // 회원가입
  rest.post("/join/owner", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // 입점신청
  rest.post("/owner/carwashes/register", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // 베이 추가
  rest.post("/owner/carwashes/:carwash_id/bays", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // *********** PUT ***********
  // 매장 정보 수정
  rest.put("/owner/carwashes/:carwash_id/details", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // 베이 활성화/비활성화
  rest.put("/owner/bays/:bay_id/status", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),

  // *********** DELETE ***********
  // 예약 취소
  rest.delete("/reservations/:reservation_id", (req, res, ctx) => {
    if (req.body) {
      return res(ctx.status(200));
    }
  }),
];
