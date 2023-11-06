import { useState } from "react";
import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";
import DaumPostcode from "react-daum-postcode";

const DaumPostcodePicker = ({ value, onChange }) => {
  const [openPostcode, setOpenPostcode] = useState(false);

  return (
    <div className="relative flex gap-4 w-96">
      <TextInput
        name="carwashAddress"
        type="text"
        value={value}
        placeholder="주소"
        disabled={true}
      />
      <Button
        onClick={() => {
          setOpenPostcode((current) => !current);
        }}
        className="shrink-0"
        style="small">
        주소검색
      </Button>
      {openPostcode && (
        <div className="absolute z-50 overflow-auto bg-white border w-96 rounded-xl">
          <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
            <div>주소검색</div>
            <Button
              className="text-xl"
              onClick={() => {
                setOpenPostcode(false);
              }}>
              ✕
            </Button>
          </div>
          <DaumPostcode
            onComplete={(data) => {
              console.log(data);
              onChange("carwashAddress", data.address);
              setOpenPostcode(false);
            }}
            autoClose={false}
          />
        </div>
      )}
    </div>
  );
};

export default DaumPostcodePicker;
