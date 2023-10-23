import { Suspense } from "react";
import CarwashManagementTemplate from "../components/templates/CarwashManagementTemplate";

const CarwashManagementPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashManagementTemplate />
    </Suspense>
  );
};

export default CarwashManagementPage;
