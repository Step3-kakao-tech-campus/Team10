import Box from "../atoms/Box";
import Image from "../atoms/Image";
import ProfileIcon from "/profile.svg";

/**
 * SalesItem 컴포넌트
 * 개별 판매내역을 보여주는 컴포넌트입니다.
 *
 * @param {String} reservationId 예약번호
 * @param {String} carwashName 세차장 이름
 * @param {String} bayNo 베이 번호
 * @param {String} nickname 고객 닉네임
 * @param {String} totalPrice 총 결제금액
 * @param {String} startTime 시작시간
 * @param {String} endTime 종료시간
 */

const SalesItem = ({
  reservationId,
  carwashName,
  bayNo,
  nickname,
  totalPrice,
  startTime,
  endTime,
}) => {
  return (
    <Box className="grid w-auto gap-4 p-4">
      <div className="text-xl text-gray-400">#{reservationId}</div>
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
          {startTime} ~ {endTime}
        </div>
      </div>
    </Box>
  );
};

export default SalesItem;
