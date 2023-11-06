import { useSuspenseQuery } from "@tanstack/react-query";
import CarwashItem from "../organisms/CarwashItem";
import { getCarwashes } from "../../apis/carwashes";

const CarwashManagementTemplate = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["carwash"],
    queryFn: getCarwashes,
  });

  const carwash = data.data.response.carwash;

  return (
    <div className="grid gap-4">
      {carwash.length !== 0 ? (
        carwash.map((item) => <CarwashItem key={item.name} carwash={item} />)
      ) : (
        <div>등록된 세차장이 없습니다. 먼저 입점신청 후 접속해주세요.</div>
      )}
    </div>
  );
};

export default CarwashManagementTemplate;
