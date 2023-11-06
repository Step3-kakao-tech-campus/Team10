import { Suspense } from "react";
import CarwashDetailEditingTemplate from "../components/templates/CarwashDetailEditingTemplate";

const CarwashDetailEditingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashDetailEditingTemplate />
    </Suspense>
  );
};

export default CarwashDetailEditingPage;
