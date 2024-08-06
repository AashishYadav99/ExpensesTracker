function InputField({ id, name, value, onChange, error, label,type = "text"  }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={type}  // Set the type dynamically
        />
        <p className="error">{error}</p>
      </div>
    </>
  );
}

export default InputField;
