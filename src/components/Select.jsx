function Select({
  id,
  name,
  value,
  onChange,
  error,
  label,
  option,
  defaultCategory,
}) {
  return (
    <>
      <div className="input-container">
        <label htmlFor={id}>{label}</label>
        <select id={id} name={name} value={value} onChange={onChange}>
          {defaultCategory && (
            <option value="" hidden>
              {defaultCategory}
            </option>
          )}
          {option.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <p className="error">{error}</p>
      </div>
    </>
  );
}

export default Select;
