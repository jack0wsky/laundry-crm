import { Drawer } from "@/modules/shared/Drawer";
import { Button } from "@/modules/shared/Button";
import { useState } from "react";
import {
  useListPricing,
  useUpdatePrice,
} from "@/modules/hotels/pricing/api/pricing.controller";
import { PricingListingItem } from "@/modules/hotels/pricing/PricingListingItem";
import { PlusIcon } from "@/modules/shared/icons/plus.icon";

interface ProductsDrawerProps {
  hotelName: string;
}

export const ProductsDrawer = ({ hotelName }: ProductsDrawerProps) => {
  const [open, setOpen] = useState(false);

  const { pricing } = useListPricing(hotelName);
  const { updatePrice } = useUpdatePrice();

  return (
    <Drawer
      open={open}
      title="Produkty"
      trigger={
        <Button onClick={() => setOpen(true)} variant="secondary">
          Produkty
        </Button>
      }
      footer={<div />}
      hideFooter
      toggleOpen={setOpen}
    >
      <div className="w-full flex flex-col px-5 overflow-y-auto">
        <button className="w-full py-3 rounded-full bg-palette-blue-600/10 hover:bg-palette-blue-600/20 transition-colors text-palette-blue-600 my-2 font-bold flex justify-center items-center gap-x-1">
          <PlusIcon className="text-xl" />
          Dodaj produkt
        </button>
        <ul className="flex flex-col gap-3 w-full overflow-y-auto">
          {pricing.map((item) => (
            <PricingListingItem
              key={`${item.id}-${item.product.name}`}
              name={item.product.name}
              price={item.price}
            />
          ))}
        </ul>
      </div>
    </Drawer>
  );
};
