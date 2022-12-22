import * as React from "react";

interface Props {
  options: { value: string; label: string }[];
  onChange: (option: any) => void;
}

const Select: React.FC<Props> = ({ options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const wholeOption = options.find((option) => option.value === value);

    onChange(wholeOption);
  };

  return (
    <select className="text-red-300" onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// usage: const options = [
//   { value: "red", label: "Red", name: "Artim" },
//   { value: "green", label: "Green", name: "Elmedin" },
//   { value: "blue", label: "Blue", name: "Shpend" },
// ];

// const handleChange = (option: any) => {
//   console.log(option); // the selected option's value
// };

// <Select options={options} onChange={handleChange} />;

export default Select;
