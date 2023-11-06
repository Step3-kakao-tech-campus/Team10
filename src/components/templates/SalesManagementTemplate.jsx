import { useSuspenseQueries } from "@tanstack/react-query";
import Checkbox from "../atoms/CheckBox";
import Card from "../molecules/Card";
import MonthSelectorCard from "../organisms/MonthSelectorCard";
import SalesItem from "../organisms/SalesItem";
import { getRevenue, getSales } from "../../apis/extras";
import { useState } from "react";

/**
 * SalesManagementTemplate 템플릿
 *
 * aside 영역과 section 영역으로 구성되어 있습니다.
 * aside 영역에는 월 선택 카드와 매장 선택 체크박스가 있고, section 영역에는 개별 매출내역 아이템들이 보여집니다.
 *
 * @todo 입점신청하기 전 월로 이동하지 못하게 처리 필요
 * @todo 날짜를 dayjs로 변환 필요 (YYYY-MM-DD)
 *
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

  // 체크되면 selectedCarwash에 carwashId를 추가하고 항상 오름차순으로 정렬
  const handleCheck = (carwashId) => (e) => {
    let updatedSelectedCarwash;
    if (e.target.checked) {
      updatedSelectedCarwash = [...selectedCarwash, carwashId].sort(
        (a, b) => a - b
      );
    } else {
      updatedSelectedCarwash = selectedCarwash.filter(
        (item) => item !== carwashId
      );
    }
    setSelectedCarwash(updatedSelectedCarwash);
  };

  const revenue = revenueData.data.data.response.revenue;
  const reservationList = salesData.data.data.response.reservationList;
  const carwashList = salesData.data.data.response.carwashList;

  console.log(reservationList);

  return (
    <div className="flex gap-16">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 gap-4">
        <MonthSelectorCard setDate={setDate} monthlyRevenue={revenue} />
        <Card title="매장별 선택">
          <div className="flex flex-col">
            {carwashList.map((item) => (
              <Checkbox
                key={item.carwashId}
                onChange={handleCheck(item.carwashId)}>
                {item.name}
              </Checkbox>
            ))}
          </div>
        </Card>
      </aside>
      <section className="grid flex-grow gap-4">
        {reservationList.length !== 0 ? (
          reservationList.map((item) => {
            return (
              <SalesItem
                key={item.reservation.reservationId}
                reservationId={item.reservation.reservationId}
                carwashName={item.carwash.name}
                bayNo={item.reservation.bayNo}
                nickname={item.reservation.nickname}
                totalPrice={item.reservation.totalPrice}
                startTime={item.reservation.startTime}
                endTime={item.reservation.endTime}
              />
            );
          })
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </section>
    </div>
  );
};

export default SalesManagementTemplate;
