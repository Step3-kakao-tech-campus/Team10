import DashboardItem from "../atoms/DashboardItem";
import CarwashShortcutItem from "../atoms/CarwashShortcutItem";
import SalesIcon from "/DashboardItem/salesIcon.svg";
import ReservationIcon from "/DashboardItem/reservationIcon.svg";

const HomeTemplate = ({ home }) => {
  return (
    <div>
      <div className="grid gap-8">
        <section className="grid gap-4">
          <h1 className="text-3xl font-bold">김춘식 사장님 안녕하세요!</h1>
          <div className="flex gap-4">
            <DashboardItem
              label="이번 달 전체 판매"
              icon={SalesIcon}
              number={home.monthlySales}
              percentage={home.salesGrowthPercentage}
            />
            <DashboardItem
              label="이번 달 전체 예약"
              icon={ReservationIcon}
              number={home.monthlyReservations}
              percentage={home.reservationGrowthPercentage}
            />
          </div>
        </section>

        <section className="grid gap-4">
          <h2 className="text-2xl font-bold">김춘식 사장님의 매장</h2>
          <div className="flex gap-4">
            {home.myStores.map((store) => (
              <CarwashShortcutItem key={store.name} carwash={store} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeTemplate;
