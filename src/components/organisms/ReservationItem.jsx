import dayjs from "dayjs";
import Box from "../atoms/Box";
import Image from "../atoms/Image";
import ProfileIcon from "/profile.svg";

const ReservationItem = ({
  reservationId,
  carwashName,
  bayNo,
  nickname,
  totalPrice,
  startTime,
  endTime,
}) => {
  const startDayjs = dayjs(startTime);
  const endDayjs = dayjs(endTime);

  const startTimeString = startDayjs.format("YYYY-MM-DD HH:mm");
  const endTimeString = endDayjs.format("YYYY-MM-DD HH:mm");

  const difference = endDayjs.diff(startDayjs, "minute");

  return (
    <Box className="grid w-auto h-40 gap-4 p-4">
      <div className="flex justify-between">
        <div className="text-xl text-gray-400">#{reservationId}</div>
        <button className="px-4 border border-black rounded-full">
          예약취소
        </button>
      </div>
      <div className="flex justify-between">
        <div className="text-xl">
          {carwashName}: 베이 {bayNo}
        </div>
        <div className="flex items-center gap-2">
          <Image src={ProfileIcon} alt="profile" />
          <div className="text-xl">{nickname}</div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-primary">
          {totalPrice.toLocaleString()}원
        </div>
        <div className="text-xl">
          {startTimeString} ~ {endTimeString} ({difference}분)
        </div>
      </div>
    </Box>
  );
};

export default ReservationItem;
