import { useCombobox } from "downshift";
import { useState } from "react";
import { DownArrowIcon } from "@/modules/shared/icons/down-arrow.icon";

interface SelectInputProps {
  label: string;
  options: { id: number; name: string }[];
  onSelect: (customerName: string) => void;
}

export const SelectInput = ({ label, options, onSelect }: SelectInputProps) => {
  const [items, setItems] = useState(options);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(
        options.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem.name);
    },
    itemToString: (item) => (item ? item.name : ""),
    items,
  });

  return (
    <div className="relative w-full">
      <div className="w-full flex flex-col gap-1">
        <label
          className="w-fit ml-5 text-sm text-palette-gray-500"
          {...getLabelProps()}
        >
          {label}
        </label>
        <div className="flex shadow-sm bg-white gap-0.5 border border-gray-300 rounded-md w-full pl-5 pr-3 py-3">
          <input
            placeholder="Wpisz nazwę klienta"
            className="w-full rounded-md focus:outline-0"
            {...getInputProps()}
          />
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            <DownArrowIcon
              className={`text-lg ${
                isOpen ? "rotate-180" : ""
              } transition-transform`}
            />
          </button>
        </div>
      </div>
      <ul
        className={`absolute w-full bg-white mt-1 shadow-md max-h-60 overflow-scroll p-0 z-10 border border-gray-50 ${
          !(isOpen && items.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item.id}
              {...getItemProps({ item, index })}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <span>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
