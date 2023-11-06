import { useState } from "react";
import Checkbox from "../atoms/CheckBox";
import TimePicker from "../atoms/TimePicker";
import RegisterFormItemStructure from "../atoms/RegisterFormItemStructure";

const OpTimePicker = ({
  weekdayOpenTime,
  weekdayCloseTime,
  weekendOpenTime,
  weekendCloseTime,
  onChange,
}) => {
  const [isWeekday24hours, setIsWeekday24hours] = useState(false);
  const [isWeekend24hours, setIsWeekend24hours] = useState(false);

  const [prevWeekdayOpenTime, setPrevWeekdayOpenTime] = useState("");
  const [prevWeekdayCloseTime, setPrevWeekdayCloseTime] = useState("");
  const [prevWeekendOpenTime, setPrevWeekendOpenTime] = useState("");
  const [prevWeekendCloseTime, setPrevWeekendCloseTime] = useState("");

  return (
    <div className="grid gap-2">
      <RegisterFormItemStructure
        label="평일 영업시간"
        besideLabel={
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setPrevWeekdayOpenTime(weekdayOpenTime);
                setPrevWeekdayCloseTime(weekdayCloseTime);
                setIsWeekday24hours(true);
                onChange("weekdayOpenTime", "00:00");
                onChange("weekdayCloseTime", "23:59");
              } else {
                setIsWeekday24hours(false);
                onChange("weekdayOpenTime", prevWeekdayOpenTime);
                onChange("weekdayCloseTime", prevWeekdayCloseTime);
              }
            }}>
            24시간 운영
          </Checkbox>
        }>
        <div className="flex items-center justify-between">
          <TimePicker
            name="weekdayOpenTime"
            value={weekdayOpenTime}
            onChange={onChange}
            disabled={isWeekday24hours}
          />
          {"~"}
          <TimePicker
            name="weekdayCloseTime"
            value={weekdayCloseTime}
            onChange={onChange}
            disabled={isWeekday24hours}
          />
        </div>
      </RegisterFormItemStructure>

      <RegisterFormItemStructure
        label="주말 영업시간"
        besideLabel={
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setPrevWeekendOpenTime(weekendOpenTime);
                setPrevWeekendCloseTime(weekendCloseTime);
                setIsWeekend24hours(true);
                onChange("weekendOpenTime", "00:00");
                onChange("weekendCloseTime", "23:59");
              } else {
                setIsWeekend24hours(false);
                onChange("weekendOpenTime", prevWeekendOpenTime);
                onChange("weekendCloseTime", prevWeekendCloseTime);
              }
            }}>
            24시간 운영
          </Checkbox>
        }>
        <div className="flex items-center justify-between">
          <TimePicker
            name="weekendOpenTime"
            value={weekendOpenTime}
            onChange={onChange}
            disabled={isWeekend24hours}
          />
          {"~"}
          <TimePicker
            name="weekendCloseTime"
            value={weekendCloseTime}
            onChange={onChange}
            disabled={isWeekend24hours}
          />
        </div>
      </RegisterFormItemStructure>
    </div>
  );
};

export default OpTimePicker;
