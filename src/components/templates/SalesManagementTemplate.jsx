import Checkbox from "../atoms/CheckBox";
import Card from "../molecules/Card";
import MonthSelectorCard from "../organisms/MonthSelectorCard";
import SalesItem from "../organisms/SalesItem";

/**
 * SalesManagementTemplate 템플릿
 * aside 영역과 section 영역으로 구성되어 있습니다.
 * aside 영역에는 월 선택 카드와 매장 선택 체크박스가 있고, section 영역에는 개별 매출내역 아이템들이 보여집니다.
 *
 * @todo
 *
 */
const SalesManagementTemplate = ({ response }) => {
  return (
    <div className="flex gap-16">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 gap-4">
        <MonthSelectorCard />
        <Card title="매장별 선택">
          <Checkbox>용봉세차타운</Checkbox>
          <Checkbox>수완세차타운</Checkbox>
        </Card>
      </aside>
      <section className="grid flex-grow gap-4">
        {response.map((item) => {
          return (
            <SalesItem
              key={item.reservationId}
              reservationId={item.reservationId}
              carwashName={item.carwashName}
              bayNo={item.bayNo}
              nickname={item.nickname}
              totalPrice={item.totalPrice}
              startTime={item.startTime}
              endTime={item.endTime}
            />
          );
        })}
      </section>
    </div>
  );
};

export default SalesManagementTemplate;
