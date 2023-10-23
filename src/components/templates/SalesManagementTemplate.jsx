import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import Checkbox from "../atoms/CheckBox";
import Card from "../molecules/Card";
import MonthSelectorCard from "../organisms/MonthSelectorCard";
import SalesItem from "../organisms/SalesItem";
import { getRevenue, getSales } from "../../apis/extras";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * SalesManagementTemplate 템플릿
 *
 * aside 영역과 section 영역으로 구성되어 있습니다.
 * aside 영역에는 월 선택 카드와 매장 선택 체크박스가 있고, section 영역에는 개별 매출내역 아이템들이 보여집니다.
 */
const SalesManagementTemplate = () => {
  const today = new Date();
  const [selectedCarwash, setSelectedCarwash] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-01"
  );

  const setDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const [salesData, revenueData] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["sales", selectedCarwash, selectedDate],
        queryFn: () => getSales(selectedCarwash, selectedDate),
      },
      {
        queryKey: ["revenue", selectedCarwash, selectedDate],
        queryFn: () => getRevenue(selectedCarwash, selectedDate),
      },
    ],
  });

  return (
    <div className="flex gap-16">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 gap-4">
        <MonthSelectorCard
          setDate={setDate}
          monthlyRevenue={revenueData.data.data.revenue.response.revenue}
        />
        <Card title="매장별 선택">
          <Checkbox>용봉세차타운</Checkbox>
          <Checkbox>수완세차타운</Checkbox>
        </Card>
      </aside>
      <section className="grid flex-grow gap-4">
        {salesData.data.data.sales.response.map((item) => {
          return (
            // carwash_id 관련 추가 필요
            <SalesItem
              key={item.reservation.reservation_id}
              reservationId={item.reservation.reservation_id}
              carwashName={item.carwash.name}
              bayNo={item.reservation.bay_no}
              nickname={item.reservation.nickname}
              totalPrice={item.reservation.total_price}
              startTime={item.reservation.start_time}
              endTime={item.reservation.end_time}
            />
          );
        })}
      </section>
    </div>
  );
};

export default SalesManagementTemplate;
