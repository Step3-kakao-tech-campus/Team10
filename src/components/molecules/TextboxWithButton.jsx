import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";

const TextboxWithButton = ({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
  buttonlabel,
  onClick,
}) => {
  return (
    <div className="flex flex-row w-96">
      <TextInput
        placeholder={placeholder}
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
      <Button type="withTextInput" label={buttonlabel} />
    </div>
  );
};

export default TextboxWithButton;
