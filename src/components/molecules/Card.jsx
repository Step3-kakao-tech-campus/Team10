import Box from "../atoms/Box";

/**
 * Card 컴포넌트
 * 사장님 페이지 왼쪽 aside 영역에 나타나는 카드 컴포넌트의 기본형입니다.
 * 상단 제목영역과 하단 내용영역으로 구성되어 있습니다.
 *
 * @param {string} title 제목
 * @param {string} children 내용
 */

const Card = ({ title, children }) => {
  return (
    <div className="w-64 overflow-auto bg-white shadow-2xl rounded-xl">
      <div className="p-4 text-2xl font-bold text-center text-white bg-primary">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
