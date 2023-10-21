import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "../atoms/TextInput";
import Checkbox from "../atoms/CheckBox";

const TimeSelector = ({ startTime, setStartTime, endTime, setEndTime }) => {
  const [is24Hour, setIs24Hour] = useState(false);

  const handle24Hour = () => {
    setIs24Hour(!is24Hour);
    if (is24Hour) {
      setStartTime(null);
      setEndTime(null);
    } else {
      setStartTime(new Date(0, 0, 0, 0, 0));
      setEndTime(new Date(0, 0, 0, 24, 0));
    }
  };

  return (
    <div>
      <div className="ml-[220px]">
        <Checkbox
          checked={is24Hour}
          onChange={handle24Hour}
          label="24시간 운영"
        />
      </div>
      <div
        className={`flex items-center pl-2 ${
          is24Hour ? "pointer-events-none" : ""
        }`}>
        {!is24Hour ? (
          <>
            <div className="flex flex-col">
              <DatePicker
                dateFormat="h:mm aa"
                shouldCloseOnSelect
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="시작 시간"
                className="w-32 px-4 bg-gray-100 border border-gray-300 h-14 rounded-xl"
                disabled={is24Hour}
              />
            </div>
            <label className="text-gray-500 text-base ml-3.5 mr-3.5">~</label>
            <div className="flex flex-col">
              <DatePicker
                dateFormat="h:mm aa"
                shouldCloseOnSelect
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="종료 시간"
                className="w-[142px] h-14 px-4 rounded-xl border border-gray-300 bg-gray-100"
                placeholderText="종료 시간"
                disabled={is24Hour}
              />
            </div>
          </>
        ) : (
          <TextInput
            name="registerform-time"
            placeholder="24시간 운영"
            readOnly></TextInput>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
