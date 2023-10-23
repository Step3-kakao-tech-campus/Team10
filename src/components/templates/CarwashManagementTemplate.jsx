import { useSuspenseQuery } from "@tanstack/react-query";
import CarwashItem from "../organisms/CarwashItem";
import { getCarwashes } from "../../apis/carwashes";

const CarwashManagementTemplate = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["carwash"],
    queryFn: getCarwashes,
  });

  const response = data.data.response.carwash;

  return (
    <div className="grid gap-4">
      {response.map((item) => (
        <CarwashItem key={item.name} carwash={item} />
      ))}
    </div>
  );
};

export default CarwashManagementTemplate;
