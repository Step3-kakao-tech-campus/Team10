import DashboardItem from "../atoms/DashboardItem";
import CarwashShortcutItem from "../atoms/CarwashShortcutItem";
import SalesIcon from "/DashboardItem/salesIcon.svg";
import ReservationIcon from "/DashboardItem/reservationIcon.svg";
import { getHome } from "../../apis/extras";
import { useSuspenseQuery } from "@tanstack/react-query";

const HomeTemplate = () => {
  const { data } = useSuspenseQuery({ queryKey: ["home"], queryFn: getHome });

  return (
    <div>
      {data && (
        <div className="grid gap-8">
          <section className="grid gap-4">
            <h1 className="text-3xl font-bold">김춘식 사장님 안녕하세요!</h1>
            <div className="flex gap-4">
              <DashboardItem
                label="이번 달 전체 판매"
                icon={SalesIcon}
                number={data.data.response.monthlySales}
                percentage={data.data.response.salesGrowthPercentage}
              />
              <DashboardItem
                label="이번 달 전체 예약"
                icon={ReservationIcon}
                number={data.data.response.monthlyReservations}
                percentage={data.data.response.reservationGrowthPercentage}
              />
            </div>
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-bold">김춘식 사장님의 매장</h2>
            <div className="flex gap-4">
              {data.data.response.myStores.map((store) => (
                <CarwashShortcutItem key={store.name} carwash={store} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
