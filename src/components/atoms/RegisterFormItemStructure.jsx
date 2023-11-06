const RegisterFormItemStructure = ({ label, besideLabel, children }) => {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <label className="text-gray-700">{label}</label>
        {besideLabel}
      </div>
      {children}
    </div>
  );
};

export default RegisterFormItemStructure;
