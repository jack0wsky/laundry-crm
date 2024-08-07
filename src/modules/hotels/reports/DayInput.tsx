import { useState } from "react";

interface DayInputProps {
  day: number;
  name: string;
  defaultValue: number;
  onBlur: (value: number) => void;
  monthName: string;
}
export const DayInput = ({
  day,
  name,
  onBlur,
  defaultValue,
  monthName,
}: DayInputProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <input
      type="text"
      min={0}
      placeholder={`${day.toString()} ${monthName}`}
      value={value > 0 ? value : ""}
      name={name}
      onChange={({ target }) => setValue(Number(target.value))}
      onBlur={() => onBlur(value)}
      className="w-[72px] p-2 rounded-md border border-palette-gray-100"
    />
  );
};
