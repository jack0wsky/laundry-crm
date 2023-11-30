import { useState } from "react";

interface DayInputProps {
  day: number;
  name: string;
  defaultValue: number;
  onChange: (value: number) => void;
}
export const DayInput = ({ name, onChange, defaultValue }: DayInputProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <input
      type="number"
      min={0}
      placeholder="Ilość"
      value={value > 0 ? value : ""}
      name={name}
      onChange={(event) => {
        setValue(Number(event.target.value));
      }}
      onBlur={(event) => {
        if (event.target.value === "") return;
        onChange(value);
      }}
      className="w-[80px] p-2 rounded-md"
    />
  );
};
