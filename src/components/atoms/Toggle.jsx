import { useId, useState } from "react";

const Toggle = ({ bay_id, status, mutation }) => {
  // status가 1이면 true, 이외 값은 false
  const [checked, setChecked] = useState(status === 1);
  const id = useId();

  const handleChecked = (e) => {
    switch (e.target.checked) {
      case true:
        if (window.confirm("베이를 활성화 하시겠습니까?")) {
          setChecked(e.target.checked);
          mutation.mutate({ bay_id, status: 1 });
        }
        break;
      case false:
        if (
          window.confirm(
            "베이를 비활성화 하시겠습니까?\n비활성화 되어있는 동안 사용자 앱에서 베이가 표시되지 않습니다."
          )
        ) {
          setChecked(e.target.checked);
          mutation.mutate({ bay_id, status: 0 });
        }
        break;
    }
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
