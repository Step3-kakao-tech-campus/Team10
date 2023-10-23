import { Suspense } from "react";
import HomeTemplate from "../components/templates/HomeTemplate";

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeTemplate />
    </Suspense>
  );
};

export default HomePage;
