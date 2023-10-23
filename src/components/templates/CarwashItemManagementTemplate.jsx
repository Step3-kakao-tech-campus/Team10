import Card from "../molecules/Card";
import CarwashBayItem from "../organisms/CarwashBayItem";
import CarwashImage from "/carwashImage.png";

const CarwashItemManagementTemplate = ({
  carwash = {
    image: CarwashImage,
    name: "용봉세차타운",
    star: 4.3,
    monthly_sales_by_store: 450000,
    monthly_reservation_by_store: 45,
    start_time: "2023-10-16T08:00",
    end_time: "2023-10-17T02:00",
    bay_list: [
      {
        bay_no: 8,
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
        bay_no: 9,
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
}) => {
  return (
    <div className="flex gap-16">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 gap-4">
        <Card title="용봉세차타운">
          <div className="flex justify-between">
            <div className="font-semibold">이번 달 매출</div>
            <div>{carwash.monthly_sales_by_store.toLocaleString()}원</div>
          </div>
          <div className="flex justify-between">
            <div className="font-semibold">이번 달 예약</div>
            <div>{carwash.monthly_reservation_by_store.toLocaleString()}건</div>
          </div>
        </Card>
        <button
          type="button"
          className="h-16 p-4 text-xl font-semibold text-white bg-gray-700 shadow-xl rounded-xl"
          onClick={(e) => {
            e.preventDefault();
          }}>
          세차장 정보 수정
        </button>
        <button
          type="button"
          className="h-16 p-4 text-xl font-semibold text-white bg-gray-700 shadow-xl rounded-xl"
          onClick={(e) => {
            e.preventDefault();
          }}>
          베이 추가
        </button>
      </aside>
      <section className="grid flex-grow gap-4">
        {carwash.bay_list.map((bay) => {
          return (
            <CarwashBayItem
              key={bay.bay_no}
              start_time={carwash.start_time}
              end_time={carwash.end_time}
              bay={bay}
            />
          );
        })}
      </section>
    </div>
  );
};

export default CarwashItemManagementTemplate;
