import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { Button } from "@/modules/shared/Button";
import {
  Option,
  ProductSelector,
} from "@/modules/hotels/pricing/ProductSelector";
import { useState } from "react";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useUpdatePrice } from "@/modules/hotels/pricing/api/pricing.controller";

interface EditProductFormProps {
  hotelName: string;
  onGoBack: () => void;
  pricing: Pricing[];
  defaultValues: {
    name: Option;
    price: string;
    databaseId: string;
  };
}

export const EditProductForm = ({
  hotelName,
  onGoBack,
  defaultValues,
  pricing,
}: EditProductFormProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValues.name);
  const [price, setPrice] = useState(defaultValues.price);

  const { updatePrice } = useUpdatePrice();

  const hasChanges =
    selectedOption?.id.toString() !== defaultValues.name.id.toString() ||
    price !== defaultValues.price;

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

          updatePrice({
            hotelName,
            price: Number(price),
            id: selectedOption.id.toString(),
          });
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
              onChange={(event) => setPrice(event.target.value)}
            />
            <p className="px-5">zł</p>
          </div>
        </label>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!hasChanges || !price}
        >
          Zapisz zmiany
        </Button>
      </form>
    </>
  );
};
