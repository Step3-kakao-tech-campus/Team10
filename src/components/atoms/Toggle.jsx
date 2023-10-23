import { useId, useState } from "react";

const Toggle = () => {
  const [checked, setChecked] = useState(false);
  const id = useId();

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <form className="flex items-center gap-2">
      <label htmlFor={id} className="font-semibold text-gray-500 select-none">
        베이 활성화
      </label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={handleChecked}
        className="box-content relative w-12 h-6 bg-gray-500 border-2 border-gray-500 rounded-full appearance-none before:transition before:absolute before:w-6 before:h-6 before:bg-white before:rounded-full checked:bg-primary checked:border-2 checked:border-primary checked:before:right-0"
      />
    </form>
  );
};

export default Toggle;
