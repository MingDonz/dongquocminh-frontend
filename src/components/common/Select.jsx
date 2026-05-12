function Select({ options, labelKey, valueKey, name, value, onChange, }) {
  return (
    <select name={name} value={value} onChange={onChange} >
      <option value="">-- Chọn --</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
export default Select;
