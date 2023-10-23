import { Link } from "react-router-dom";
import MultipleTimeTable from "../molecules/MultipleTimeTable";

const CarwashItem = ({ carwash }) => {
  return (
    <Link to="/manage/item" className="flex overflow-auto shadow-xl rounded-xl">
      <img className="w-48 h-48" src={carwash.image} alt={carwash.name} />
      <div className="flex-grow">
        <div className="p-4 text-2xl font-bold text-white bg-primary">
          {carwash.name}
        </div>
        <div className="p-4">
          <MultipleTimeTable carwash={carwash} />
        </div>
      </div>
    </Link>
  );
};

export default CarwashItem;
