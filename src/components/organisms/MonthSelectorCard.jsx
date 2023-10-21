import { useState } from "react";
import Button from "../atoms/Button";
import Card from "../molecules/Card";

/**
 * MonthSelectorCard 컴포넌트
 * 월 선택 카드입니다.
 *
 * @todo 상태 끌어올려서 부모 컴포넌트에서 월 선택시 해당 월 매출 금액 조회 구현
 * @todo 월 선택시 카드 하단에 해당 월 매출 금액 조회 구현
 */
const MonthSelectorCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "-") {
      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
      );
    } else {
      const today = new Date();
      if (
        selectedDate.getFullYear() >= today.getFullYear() &&
        selectedDate.getMonth() >= today.getMonth()
      ) {
        return;
      }

      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
      );
    }
  };

  return (
    <Card
      // 월 선택
      title={
        <div className="flex items-center justify-between">
          <Button id="-" className="w-6 h-12 select-none" onClick={handleClick}>
            ◀
          </Button>
          <div>
            <div>{selectedDate.getFullYear()}년</div>
            <div className="text-4xl">{selectedDate.getMonth() + 1 + "월"}</div>
          </div>
          <Button id="+" className="w-6 h-12 select-none" onClick={handleClick}>
            ▶
          </Button>
        </div>
      }>
      {/* 해당 월 매출 금액 */}
      <div className="text-2xl font-semibold text-center text-primary">
        1,170,000원
      </div>
    </Card>
  );
};

export default MonthSelectorCard;
