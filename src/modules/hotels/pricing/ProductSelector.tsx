import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useListProducts } from "@/modules/hotels/pricing/api/products.controller";

export interface Option {
  id: number;
  name: string;
  order: number;
}

interface ProductSelectorProps {
  selectedOption: Option | null;
  onChange: (option: Option) => void;
  pricing: Pricing[];
}

export const ProductSelector = ({
  selectedOption,
  onChange,
  pricing,
}: ProductSelectorProps) => {
  const [query, setQuery] = useState("");

  const { products } = useListProducts();

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
    <label>
      <span className="text-palette-gray-400 ml-5 text-sm">Nazwa produktu</span>
      <Combobox<Option>
        nullable
        value={selectedOption}
        defaultValue={selectedOption}
        onChange={onChange}
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
  );
};
