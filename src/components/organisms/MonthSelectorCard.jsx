import { useState } from "react";
import Button from "../atoms/Button";
import Card from "../molecules/Card";

/**
 * MonthSelectorCard 컴포넌트
 * 월 선택 카드입니다.
 *
 * @todo 월 선택시 카드 하단에 해당 월 매출 금액 조회 구현
 */
const MonthSelectorCard = ({ setDate, monthlyRevenue }) => {
  const today = new Date();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleClickDecrease = () => {
    let updatedYear = year;
    let updatedMonth = month;

    if (month === 1) {
      updatedYear = year - 1;
      updatedMonth = 12;
    } else {
      updatedMonth = month - 1;
    }

    setDate(updatedYear + "-" + updatedMonth + "-01");
    setYear(updatedYear);
    setMonth(updatedMonth);
  };

  const handleClickIncrease = () => {
    // 이번 달 이후로는 조회 불가능
    if (year >= today.getFullYear() && month >= today.getMonth() + 1) return;

    let updatedYear = year;
    let updatedMonth = month;

    if (month === 12) {
      updatedYear = year + 1;
      updatedMonth = 1;
    } else {
      updatedMonth = month + 1;
    }

    setDate(updatedYear + "-" + updatedMonth + "-01");
    setYear(updatedYear);
    setMonth(updatedMonth);
  };

  return (
    <Card
      // 월 선택
      title={
        <div className="flex items-center justify-between">
          <Button
            id="-"
            className="w-6 h-12 select-none"
            onClick={handleClickDecrease}>
            ◀
          </Button>
          <div>
            <div>{year}년</div>
            <div className="text-4xl">{month}월</div>
          </div>
          <Button
            id="+"
            className="w-6 h-12 select-none"
            onClick={handleClickIncrease}>
            ▶
          </Button>
        </div>
      }>
      {/* 해당 월 매출 금액 */}
      <div className="text-2xl font-semibold text-center text-primary">
        {monthlyRevenue.toLocaleString()}원
      </div>
    </Card>
  );
};

export default MonthSelectorCard;
