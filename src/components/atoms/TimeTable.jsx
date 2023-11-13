/**
 * TimeTable 컴포넌트
 *
 * 예약된 시간을 표시하는 시간표를 렌더링하는 컴포넌트입니다.
 * 운영 시작시간과 운영 종료시간은 오늘 날짜를 포함해야 합니다.
 *
 * - 24시간 운영하는 경우: start_time을 0시 0분으로 설정하고 end_time을 23시 59분으로 설정하여 인자로 넘깁니다.
 * - 운영시간이 하루를 넘어가는 경우: end_time에 하루를 더해서 인자로 넘깁니다.
 * - 운영시간이 하루를 넘어기지 않는 경우: start_time과 end_time을 그대로 인자로 넘깁니다.
 *
 * @param {Array} bookedTime 예약된 시간 배열 [ {start_time: "yyyy-mm-ddThh-mm", end_time: "yyyy-mm-ddThh-mm"} ]
 */

import dayjs from "dayjs";

const TimeTable = ({ optime, bookedTime }) => {
  const today = dayjs();

  let start_time;
  let end_time;

  if (today.day() === 0 || today.day() === 6) {
    start_time = optime.weekend.start;
    end_time = optime.weekend.end;
  } else {
    start_time = optime.weekday.start;
    end_time = optime.weekday.end;
  }

  const startTime = new Date();
  const endTime = new Date();

  startTime.setHours(start_time.split(":")[0], start_time.split(":")[1]);
  endTime.setHours(end_time.split(":")[0], end_time.split(":")[1]);

  let startHour = startTime.getHours();
  let startMinute = startTime.getMinutes();
  let endHour;
  let endMinute;

  // 24시간 운영할 때: endHour와 endMinute을 24시 0분으로 설정
  if (endTime.getHours() === 23 && endTime.getMinutes() === 59) {
    endHour = 24;
    endMinute = 0;
  }
  // 운영시간이 하루를 넘어가는 경우: endHour에 24를 더해서 설정
  else if (endTime.getDate() > startTime.getDate()) {
    endHour = endTime.getHours() + 24;
    endMinute = endTime.getMinutes();
  }
  // 운영시간이 하루를 넘어가지 않는 경우: endHour와 endMinute을 그대로 설정
  else {
    endHour = endTime.getHours();
    endMinute = endTime.getMinutes();
  }

  /**
   * isTimeSlotBooked 함수
   *
   * 시간표에서 특정 시간이 예약되어 있는지 확인하는 함수입니다.
   * hour, minute을 인자로 받아서, bookedTime 배열에 있는 예약된 시간과 비교합니다.
   *
   * @param {Number} hour
   * @param {Number} minute
   * @returns
   */
  const isTimeSlotBooked = (hour, minute) => {
    const slotStartTime = new Date();
    slotStartTime.setHours(hour, minute, 0, 0);
    const slotEndTime = new Date();
    slotEndTime.setHours(hour, minute + 30, 0, 0);

    return bookedTime.some((booking) => {
      return (
        new Date(booking.start) <= slotStartTime &&
        new Date(booking.end) >= slotEndTime
      );
    });
  };

  /**
   * hourLoop 함수
   *
   * (endHour - startHour + 1)만큼의 th 엘리먼트 배열에 모아 반환합니다.
   * startMinute이 30분이면 1, 0분이면 2를 colSpan으로 설정하고 startHour를 th 엘리먼트에 담아 배열에 추가합니다.
   * startHour + 1부터 endHour - 1까지의 숫자를 th 엘리먼트에 colSpan="2" 속성과 함께 추가합니다.
   * endMinute이 30분이면 colSpan을 1로 설정하고 endHour를 th 엘리먼트에 담아 배열에 추가합니다.
   *
   * @param {Number} startHour
   * @param {Number} endHour
   * @returns
   */
  const hourLoop = (startHour, endHour) => {
    const result = [];
    let colSpan;

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

  /**
   * minuteLoop 함수
   *
   * (endHour - startHour) * 2만큼의 td 엘리먼트 배열에 모아 반환합니다.
   * startMinute이나 endMinute이 30일 때는 해당 시간은 한칸만 배열에 추가합니다.
   *
   * @param {Number} startMinute
   * @param {Number} endMinute
   * @returns
   */
  const minuteLoop = (startMinute, endMinute) => {
    const result = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      const isBooked = isTimeSlotBooked(currentHour, currentMinute);

      result.push(
        <td
          key={`${currentHour}-${currentMinute}`}
          className={`w-12 h-6 border border-gray-500 ${
            isBooked ? "bg-primary hover:bg-sky-300" : ""
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
        <tr>{minuteLoop(startMinute, endMinute)}</tr>
      </tbody>
    </table>
  );
};

export default TimeTable;
