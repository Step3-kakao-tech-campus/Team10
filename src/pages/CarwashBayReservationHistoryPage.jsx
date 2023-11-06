import { Suspense } from "react";
import CarwashBayReservationHistoryTemplate from "../components/templates/CarwashBayReservationHistoryTemplate";

const CarwashBayReservationHistoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashBayReservationHistoryTemplate />
    </Suspense>
  );
};

export default CarwashBayReservationHistoryPage;
