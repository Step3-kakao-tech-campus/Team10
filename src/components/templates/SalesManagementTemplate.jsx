import { useSuspenseQueries } from "@tanstack/react-query";
import Checkbox from "../atoms/CheckBox";
import Card from "../molecules/Card";
import MonthSelectorCard from "../organisms/MonthSelectorCard";
import SalesItem from "../organisms/SalesItem";
import { getRevenue, getSales } from "../../apis/extras";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { isEmpty } from "../../utils/isEmpty";
import MainContentLayout from "../atoms/MainContentLayout";
import AsideLayout from "../atoms/AsideLayout";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

/**
 * SalesManagementTemplate 템플릿
 *
 * aside 영역과 section 영역으로 구성되어 있습니다.
 * aside 영역에는 월 선택 카드와 매장 선택 체크박스가 있고, section 영역에는 개별 매출내역 아이템들이 보여집니다.
 */
const SalesManagementTemplate = () => {
  const [selectedCarwash, setSelectedCarwash] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
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

  const carwashList = salesData.data.data.response.carwashList;
  const reservationList = salesData.data.data.response.reservationList;
  const revenue = revenueData.data.data.response.revenue;

  return (
    <div className="flex gap-16">
      <AsideLayout>
        <MonthSelectorCard onChange={setDate} monthlyRevenue={revenue} />
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
      </AsideLayout>
      <MainContentLayout>
        {isEmpty(reservationList) ? (
          <div className="flex flex-col items-center justify-center w-auto gap-8">
            <div className="text-xl">매출내역이 없습니다.</div>
          </div>
        ) : (
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
        )}
      </MainContentLayout>
    </div>
  );
};

export default SalesManagementTemplate;
