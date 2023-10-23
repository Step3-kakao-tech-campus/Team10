import { instance } from "./instance";

// 홈화면 데이터
export const getHome = () => {
  return instance.get("/owner/home");
};

// 베이 활성화 비활성화
export const setBayStatus = (bay_id, status) => {
  return instance.get(`/owner/bays/${bay_id}}/status`, { status });
};

// 매출관리 데이터
export const getSales = (carwash_id, selected_date) => {
  return instance.get(
    `/owner/sales?carwash-id=${carwash_id}&selected-date=${selected_date}`
  );
};

// 월 매출 데이터
export const getRevenue = (carwash_id, selected_date) => {
  return instance.get(
    `/owner/revenue?carwash-id=${carwash_id}&selected-date=${selected_date}`
  );
};
