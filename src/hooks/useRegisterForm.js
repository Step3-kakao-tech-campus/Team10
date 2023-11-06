import { useState } from "react";

const useRegisterForm = (initialValue) => {
  const [inputs, setInputs] = useState(initialValue);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return [inputs, handleChange];
};

export default useRegisterForm;
