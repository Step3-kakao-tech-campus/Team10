import HomeTemplate from "../components/templates/HomeTemplate";

const HomePage = () => {
  const response = {
    monthlySales: 500000,
    salesGrowthPercentage: 10.5, // 전월대비 판매 성장률 (단위: %)
    monthlyReservations: 200,
    reservationGrowthPercentage: 8.0, // 전월대비 예약 성장률 (단위: %)
    myStores: [
      {
        imageUrl: "https://example.com/carwash1.jpg",
        name: "세차장 A",
        monthlySales: 250000,
        monthlyReservations: 100,
      },
      {
        imageUrl: "https://example.com/carwash2.jpg",
        name: "세차장 B",
        monthlySales: 150000,
        monthlyReservations: 75,
      },
    ],
  };

  return <HomeTemplate home={response} />;
};

export default HomePage;
