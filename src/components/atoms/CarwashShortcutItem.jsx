import { Link } from "react-router-dom";

const CarwashShortcutItem = ({ carwash }) => {
  console.log(carwash);
  return (
    <Link
      to={`/manage/item/${carwash.carwashId}`}
      className="flex items-center gap-4 overflow-auto bg-white shadow-xl w-96 rounded-xl">
      <div className="relative w-36 h-36">
        <img
          src={carwash.imageFiles[0].url}
          alt={carwash.name}
          className="absolute object-cover w-36 h-36"
        />
      </div>
      <div className="grid gap-2 w-52">
        <div className="overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap">
          {carwash.name}
        </div>
        <div className="grid gap-1">
          <div className="flex justify-between">
            <div className="font-semibold">이번 달 매출</div>
            <div>{carwash.monthlySales.toLocaleString()}원</div>
          </div>
          <div className="flex justify-between">
            <div className="font-semibold">이번 달 예약</div>
            <div>{carwash.monthlyReservations.toLocaleString()}건</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarwashShortcutItem;
