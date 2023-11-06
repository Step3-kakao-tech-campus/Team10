import { Suspense } from "react";
import CarwashItemManagementTemplate from "../components/templates/CarwashItemManagementTemplate";

const CarwashItemManagementPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashItemManagementTemplate />
    </Suspense>
  );
};

export default CarwashItemManagementPage;
