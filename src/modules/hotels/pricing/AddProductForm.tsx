import { Combobox, Transition } from "@headlessui/react";
import { useListProducts } from "@/modules/hotels/pricing/api/products.controller";
import { useAddPricingItem } from "@/modules/hotels/pricing/api/pricing.controller";
import { useState } from "react";
import { Button } from "@/modules/shared/Button";
import { Pricing } from "@/modules/hotels/pricing/types";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";

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
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [price, setPrice] = useState<string>("");

  const { products } = useListProducts();
  const { addProductWithPrice, loading } = useAddPricingItem();

  const lastItem = pricing[pricing.length - 1];

  const existingProductsIds = pricing.map((price) => price.product.id);

  const availableProducts = products.filter(
    (product) => !existingProductsIds.includes(product.id),
  );

  const filteredProducts = !!query
    ? availableProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()),
      )
    : availableProducts;

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
        <label>
          <span className="text-palette-gray-400 ml-5 text-sm">
            Nazwa produktu
          </span>
          <Combobox<Option>
            nullable
            value={selectedOption}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
          >
            <div className="relative">
              <div className="w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-200">
                <Combobox.Input
                  defaultValue={{ id: 0, name: "", order: 0 }}
                  displayValue={(item) => item?.name}
                  className="w-full border-none py-3 pl-5 pr-10 leading-5 text-gray-900 focus:outline-0 text-base"
                  onChange={({ target }) => setQuery(target.value)}
                  placeholder="Wpisz nazwę..."
                />
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredProducts.map((product) => (
                      <Combobox.Option
                        key={product.id}
                        value={product}
                        className="px-2 py-1 text-base hover:bg-gray-100 cursor-pointer"
                      >
                        {product.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </div>
          </Combobox>
        </label>

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
