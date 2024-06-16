import { Combobox, Transition } from "@headlessui/react";
import { useListProducts } from "@/modules/comarch/api/products.controller";
import {
  useAddPricingItem,
  useListPricing,
} from "@/modules/hotels/pricing/api/pricing.controller";
import { useState } from "react";
import { Button } from "@/modules/shared/Button";

interface Option {
  id: number;
  name: string;
  order: number;
}

interface AddProductFormProps {
  hotelName: string;
  onProductAdded: () => void;
}

export const AddProductForm = ({
  hotelName,
  onProductAdded,
}: AddProductFormProps) => {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [price, setPrice] = useState<string>("");

  const { pricing } = useListPricing(hotelName);
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
    <form
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
      <label>Wybierz produkt</label>
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
              className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:outline-0 text-base"
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

      <label className="flex flex-col mt-4">
        <span>Cena</span>
        <input
          type="number"
          className="p-1 border border-gray-200"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>

      <Button
        type="submit"
        className="w-full mt-6"
        onClick={() => {}}
        disabled={!selectedOption || !price}
      >
        Dodaj
      </Button>
    </form>
  );
};
