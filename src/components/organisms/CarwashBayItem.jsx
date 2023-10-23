import TimeTable from "../atoms/TimeTable";
import Toggle from "../atoms/Toggle";

const CarwashBayItem = ({ start_time, end_time, bay }) => {
  return (
    <div className="p-4 shadow-xl rounded-xl">
      <div className="flex justify-between">
        <div className="text-xl font-semibold">베이 {bay.bay_no}</div>
        <div className="flex gap-4">
          <Toggle />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="box-content w-12 text-gray-500 border-2 border-gray-500 rounded-full ">
            삭제
          </button>
        </div>
      </div>

      <TimeTable
        start_time={start_time}
        end_time={end_time}
        bookedTime={bay.bay_bookedTime}
      />
    </div>
  );
};

export default CarwashBayItem;
