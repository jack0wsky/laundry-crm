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
import { AnimatePresence } from "framer-motion";
import { Pricing } from "@/modules/hotels/pricing/types";
import { DeleteProduct } from "@/modules/hotels/pricing/DeleteProduct";

interface ProductsDrawerProps {
  hotelName: string;
}

type Mode =
  | { type: "listing" }
  | { type: "new-product" }
  | { type: "edit-product"; payload: Pricing }
  | { type: "delete-product"; payload: Pricing };

export const ProductsDrawer = ({ hotelName }: ProductsDrawerProps) => {
  const [mode, setMode] = useState<Mode>({ type: "listing" });
  const [open, setOpen] = useState(false);

  const { pricing } = useListPricing(hotelName);
  const { updatePrice } = useUpdatePrice();

  const getTitle = () => {
    if (mode.type === "new-product") return "Dodaj produkt";
    if (mode.type === "edit-product") return "Edytuj produkt";
    if (mode.type === "delete-product") return "Usuń produkt";
    return "Produkty";
  };

  const goToListing = () => setMode({ type: "listing" });

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
      <AnimatePresence>
        <div className="w-full flex flex-col px-5 h-full overflow-y-auto">
          {mode.type === "listing" && (
            <button
              onClick={() => setMode({ type: "new-product" })}
              className="w-full py-3 rounded-full bg-palette-blue-600/10 hover:bg-palette-blue-600/20 transition-colors text-palette-blue-600 my-2 font-bold flex justify-center items-center gap-x-1"
            >
              <PlusIcon className="text-xl" />
              Dodaj produkt
            </button>
          )}

          {mode.type === "delete-product" && (
            <DeleteProduct
              pricing={mode.payload}
              onGoBack={goToListing}
              onDeleteConfirm={() => {}}
            />
          )}

          {mode.type === "new-product" && (
            <AddProductForm
              hotelName={hotelName}
              onGoBack={goToListing}
              onProductAdded={goToListing}
              pricing={pricing}
            />
          )}

          {mode.type === "listing" && (
            <ProductsListing
              pricing={pricing}
              onProductEdit={(product) =>
                setMode({ type: "edit-product", payload: product })
              }
              onProductDelete={(product) =>
                setMode({ type: "delete-product", payload: product })
              }
            />
          )}
        </div>
      </AnimatePresence>
    </Drawer>
  );
};
