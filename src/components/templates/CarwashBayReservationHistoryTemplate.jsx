import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "../molecules/Card";
import { getCarwashBayReservationHistory } from "../../apis/carwashes";
import { useParams } from "react-router-dom";
import ReservationItem from "../organisms/ReservationItem";

const CarwashBayReservationHistoryTemplate = () => {
  const carwash_id = useParams().carwash_id;
  const bay_id = useParams().bay_id;

  const { data } = useSuspenseQuery({
    queryKey: ["reservationHistory"],
    queryFn: () => getCarwashBayReservationHistory(carwash_id, bay_id),
  });

  const reservationList = data.data.response.reservationList;
  const carwashName = data.data.response.reservationList[0].carwash.name;

  return (
    <div className="flex gap-16">
      <aside className="flex flex-col flex-grow-0 flex-shrink-0 gap-4">
        <Card title={carwashName}>
          <div className="grid gap-2">
            <div>
              <div className="flex justify-between">
                <div className="font-semibold">이번 달 매출</div>
                <div>{}원</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">이번 달 예약</div>
                <div>{}건</div>
              </div>
            </div>
          </div>
        </Card>
      </aside>
      <section className="grid flex-grow gap-4">
        {reservationList.map((item) => {
          return (
            <ReservationItem
              key={item.reservationId}
              reservationId={item.reservation.reservationId}
              carwashName={item.carwash.name}
              bayNo={item.reservation.bayNo}
              nickname={item.reservation.nickname}
              totalPrice={item.reservation.totalPrice}
              startTime={item.reservation.startTime}
              endTime={item.reservation.endTime}
            />
          );
        })}
      </section>
    </div>
  );
};

export default CarwashBayReservationHistoryTemplate;
