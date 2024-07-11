import { Drawer } from "@/modules/shared/Drawer";
import { Button } from "@/modules/shared/Button";
import { useState } from "react";
import {
  useListPricing,
  useUpdatePrice,
} from "@/modules/hotels/pricing/api/pricing.controller";
import { PlusIcon } from "@/modules/shared/icons/plus.icon";
import { ProductsListing } from "@/modules/hotels/pricing/ProductsListing";
import { AddProductForm } from "@/modules/hotels/pricing/AddProductForm";

interface ProductsDrawerProps {
  hotelName: string;
}

export const ProductsDrawer = ({ hotelName }: ProductsDrawerProps) => {
  const [mode, setMode] = useState<
    "listing" | "new-product" | "edit-product" | "delete-product"
  >("listing");
  const [open, setOpen] = useState(false);

  const { pricing } = useListPricing(hotelName);
  const { updatePrice } = useUpdatePrice();

  const getTitle = () => {
    if (mode === "new-product") return "Dodaj produkt";
    if (mode === "edit-product") return "Edytuj produkt";
    if (mode === "delete-product") return "Usuń produkt";
    return "Produkty";
  };

  return (
    <Drawer
      open={open}
      title={getTitle()}
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
        {mode === "listing" && (
          <button
            onClick={() => setMode("new-product")}
            className="w-full py-3 rounded-full bg-palette-blue-600/10 hover:bg-palette-blue-600/20 transition-colors text-palette-blue-600 my-2 font-bold flex justify-center items-center gap-x-1"
          >
            <PlusIcon className="text-xl" />
            Dodaj produkt
          </button>
        )}

        {mode === "new-product" && (
          <AddProductForm
            hotelName={hotelName}
            onGoBack={() => setMode("listing")}
            onProductAdded={() => setMode("listing")}
            pricing={pricing}
          />
        )}

        {mode === "listing" && (
          <ProductsListing
            pricing={pricing}
            onProductEdit={() => {}}
            onProductDelete={() => {}}
          />
        )}
      </div>
    </Drawer>
  );
};
