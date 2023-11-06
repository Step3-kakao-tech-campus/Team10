import { Outlet, useNavigate } from "react-router-dom";
import GNB from "../components/atoms/GNB";
import { useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <GNB />
      <main className="w-[1280px] mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
