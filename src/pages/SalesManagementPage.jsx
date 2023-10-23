import { Suspense } from "react";
import SalesManagementTemplate from "../components/templates/SalesManagementTemplate";

const SalesManagementPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalesManagementTemplate />
    </Suspense>
  );
};

export default SalesManagementPage;
