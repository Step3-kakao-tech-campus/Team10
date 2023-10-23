import dayjs from "dayjs";

const MultipleTimeTable = ({ carwash }) => {
  // 오늘이 주말인지 확인하는 함수
  const isTodayWeekend = () => {
    const today = dayjs();
    const day = today.day();

    return day === 0 || day === 6;
  };

  // 문자열을 dayjs 객체로 변환하는 함수
  const convertToDayjs = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number);
    return dayjs().startOf("day").hour(hour).minute(minute);
  };

  // 주말인지 여부에 따라 시간표 시작 시간과 끝 시간을 설정
  let startTime;
  let endTime;

  if (isTodayWeekend()) {
    startTime = convertToDayjs(carwash.optime.weekend.start);
    endTime = convertToDayjs(carwash.optime.weekend.end);
  } else {
    startTime = convertToDayjs(carwash.optime.weekday.start);
    endTime = convertToDayjs(carwash.optime.weekday.end);
  }

  // 시간표 시작 시간과 끝 시간을 시간과 분으로 나눔
  // 분의 경우는 다음과 같이 처리:
  // 1. 끝 시간이 23:59인 경우, 24:00으로 변경
  // 2. 끝 시간이 시작 시간보다 뒤인 경우, 끝 시간에 24시간을 더함 (12시 넘어서 운영하는 경우)
  // 3. 그 외의 경우는 끝 시간 그대로 사용
  let startHour = startTime.hour();
  let startMinute = startTime.minute();
  let endHour;
  let endMinute;

  if (endTime.hour() === 23 && endTime.minute() === 59) {
    endHour = 24;
    endMinute = 0;
  } else if (endTime.date() > startTime.date()) {
    endHour = endTime.hour() + 24;
    endMinute = endTime.minute();
  } else {
    endHour = endTime.hour();
    endMinute = endTime.minute();
  }

  // 시간표에 예약된 시간이 있는지 확인하는 함수
  // 예약된 시간이 있으면 true, 없으면 false를 반환
  const isTimeSlotBooked = (hour, minute, bookedTime) => {
    const slotStartTime = dayjs(startTime).hour(hour).minute(minute);
    const slotEndTime = slotStartTime.add(30, "minute");

    return bookedTime.some(
      (booking) =>
        // dayjs에 <=, >= 연산자가 없어서 isSame, isBefore, isAfter 메서드를 사용
        (dayjs(booking.start_time).isSame(slotStartTime) ||
          dayjs(booking.start_time).isBefore(slotStartTime)) &&
        (dayjs(booking.end_time).isSame(slotEndTime) ||
          dayjs(booking.end_time).isAfter(slotEndTime))
    );
  };

  const hourLoop = (startHour, endHour) => {
    const result = [];
    let colSpan;
    result.push(<th key="empty" className="border border-gray-500"></th>);

    if (startMinute === 30) colSpan = 1;
    else colSpan = 2;

    result.push(
      <th key={startHour} colSpan={colSpan} className="border border-gray-500">
        {startHour}
      </th>
    );

    for (let i = startHour + 1; i < endHour; i++) {
      result.push(
        <th key={i} colSpan="2" className="border border-gray-500">
          {i}
        </th>
      );
    }

    if (endMinute === 30) {
      result.push(
        <th key={endHour} colSpan="1" className="border border-gray-500">
          {endHour}
        </th>
      );
    }

    return result;
  };

  const minuteLoop = (startMinute, endMinute, bookedTime, bay_no) => {
    const result = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    result.push(
      <td
        key={`베이 ${bay_no}`}
        className="w-16 h-6 text-center border border-gray-500">
        베이 {bay_no}
      </td>
    );

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const isBooked = isTimeSlotBooked(currentHour, currentMinute, bookedTime);

      result.push(
        <td
          key={`${currentHour}:${currentMinute}`}
          className={`w-5 h-8 border border-gray-500 ${
            isBooked && "bg-primary"
          }`}></td>
      );

      if (currentMinute === 30) {
        currentHour++;
        currentMinute = 0;
      } else {
        currentMinute = 30;
      }
    }

    return result;
  };

  return (
    <table>
      <thead>
        <tr className="bg-gray-300">{hourLoop(startHour, endHour)}</tr>
      </thead>
      <tbody>
        {carwash.bays.map((item) => {
          return (
            <tr key={item.bay_no}>
              {minuteLoop(
                startMinute,
                endMinute,
                item.bay_bookedTime,
                item.bay_no
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MultipleTimeTable;
