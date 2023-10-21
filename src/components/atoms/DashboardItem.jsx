import Image from "./Image";

const DashboardItem = ({ label, number, percentage, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white w-96 rounded-xl">
      <div>
        <div>{label}</div>
        <div className="text-3xl font-bold">{number}</div>
        <div className="font-semibold">
          지난 달 대비 {percentage >= 0 ? "+" : ""}
          {percentage + "%"}
        </div>
      </div>
      <Image src={icon} alt={label} />
    </div>
  );
};

export default DashboardItem;
