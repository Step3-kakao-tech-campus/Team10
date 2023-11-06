import { useEffect, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const TimePicker = ({ value, onChange, name, disabled = false }) => {
  const [time, setTime] = useState(value);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 컴포넌트 밖을 클릭하면 타임피커를 닫는다.
  const timePickerRef = useClickOutside(() => {
    setShowTimePicker(false);
  });

  useEffect(() => {
    setTime(value);
  }, [value]);

  const generateTimeList = () => {
    let timeElements = [];

    for (let hour = 0; hour < 24; hour++) {
      ["00", "30"].forEach((minutes) => {
        const timeStr = (hour + ":" + minutes).padStart(5, "0");
        timeElements.push(
          <div
            key={timeStr}
            className="text-center select-none hover:bg-gray-100"
            onClick={() => {
              setTime(timeStr);
              setShowTimePicker(false);
              onChange(name, timeStr);
            }}>
            {timeStr}
          </div>
        );
      });
    }

    return timeElements;
  };

  return (
    <div className="relative" ref={timePickerRef}>
      <div
        className={`w-44 p-4 text-center text-black bg-gray-100 border border-gray-300 outline-none cursor-pointer rounded-xl ${
          disabled && "opacity-30"
        }`}
        onClick={() => {
          if (disabled) return;
          setShowTimePicker(!showTimePicker);
        }}>
        {time || "시간 선택"}
      </div>
      {showTimePicker && (
        <div className="absolute z-50 overflow-auto text-black bg-white border border-gray-300 w-44 h-36 rounded-xl">
          {generateTimeList()}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
