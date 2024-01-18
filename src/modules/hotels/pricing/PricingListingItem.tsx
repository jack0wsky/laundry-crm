import { useState } from "react";
import { Button } from "@/modules/shared/Button";

interface PricingListingItemProps {
  name: string;
  price: number;
  onSave: (price: number) => void;
}
export const PricingListingItem = ({
  name,
  price,
  onSave,
}: PricingListingItemProps) => {
  const [value, setValue] = useState<number>(price);

  return (
    <li className="w-full flex justify-between border-b pb-3 items-center">
      <p className="font-medium text-lg capitalize mr-2">{name}</p>
      <div className="flex items-center gap-x-3">
        <input
          type="number"
          placeholder="Cena"
          value={value}
          onChange={(event) => {
            setValue(Number(event.target.value));
          }}
          className="bg-gray-100 p-2"
        />
        <Button
          variant="secondary"
          disabled={price === value}
          onClick={() => onSave(value)}
        >
          Zapisz
        </Button>
      </div>
    </li>
  );
};
