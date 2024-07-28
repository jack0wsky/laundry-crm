import { useAddPricingItem } from "@/modules/hotels/pricing/api/pricing.controller";
import { useState } from "react";
import { Button } from "@/modules/shared/Button";
import { Pricing } from "@/modules/hotels/pricing/types";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { ProductSelector } from "@/modules/hotels/pricing/ProductSelector";

interface Option {
  id: number;
  name: string;
  order: number;
}

interface AddProductFormProps {
  hotelName: string;
  onProductAdded: () => void;
  onGoBack: () => void;
  pricing: Pricing[];
}

export const AddProductForm = ({
  hotelName,
  onProductAdded,
  pricing,
  onGoBack,
}: AddProductFormProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [price, setPrice] = useState("");

  const { addProductWithPrice, loading } = useAddPricingItem();

  const lastItem = pricing[pricing.length - 1];

  return (
    <>
      <button
        onClick={onGoBack}
        className="flex items-center my-2 gap-x-1 py-1.5 pl-2 pr-3 border border-palette-gray-100 rounded-full w-max hover:border-palette-gray-400 transition-colors"
      >
        <LeftArrowIcon />
        <span>Produkty</span>
      </button>

      <form
        className="mt-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (!selectedOption) return;

          addProductWithPrice(
            {
              price: Number(price),
              product: selectedOption.id,
              hotel: hotelName,
              order: pricing.length > 0 ? lastItem.order + 1 : 1,
            },
            { onSuccess: onProductAdded },
          );
        }}
      >
        <ProductSelector
          selectedOption={selectedOption}
          onChange={setSelectedOption}
          pricing={pricing}
        />

        <label className="flex flex-col mt-4">
          <span className="text-palette-gray-400 ml-5 text-sm">Cena</span>
          <div className="flex items-center w-full">
            <input
              type="number"
              className="text-base rounded-lg bg-white text-left border border-gray-200 py-3 px-5 w-full"
              value={price}
              min={0}
              onChange={(event) => setPrice(event.target.value)}
            />
            <p className="px-5">zł</p>
          </div>
        </label>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!selectedOption || !price}
        >
          Dodaj
        </Button>
      </form>
    </>
  );
};
