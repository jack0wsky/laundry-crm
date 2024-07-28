import { Drawer } from "@/modules/shared/Drawer";
import { ReactElement, useState } from "react";
import { useListPricing } from "@/modules/hotels/pricing/api/pricing.controller";
import { PlusIcon } from "@/modules/shared/icons/plus.icon";
import { ProductsListing } from "@/modules/hotels/pricing/ProductsListing";
import { AddProductForm } from "@/modules/hotels/pricing/AddProductForm";
import { AnimatePresence } from "framer-motion";
import { Pricing } from "@/modules/hotels/pricing/types";
import { DeleteProduct } from "@/modules/hotels/pricing/DeleteProduct";
import { EditProductForm } from "@/modules/hotels/pricing/EditProductForm";

interface ProductsDrawerProps {
  hotelName: string;
  trigger: (openModal: () => void) => ReactElement;
}

type Mode =
  | { type: "listing" }
  | { type: "new-product" }
  | { type: "edit-product"; payload: Pricing }
  | { type: "delete-product"; payload: Pricing };

export const ProductsDrawer = ({ hotelName, trigger }: ProductsDrawerProps) => {
  const [mode, setMode] = useState<Mode>({ type: "listing" });
  const [open, setOpen] = useState(false);

  const { pricing } = useListPricing(hotelName);

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
      trigger={trigger(() => setOpen(true))}
      footer={<div />}
      hideFooter
      toggleOpen={(opened) => {
        setOpen(opened);
        if (!opened) setMode({ type: "listing" });
      }}
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

          {mode.type === "edit-product" && (
            <EditProductForm
              hotelName={hotelName}
              onGoBack={goToListing}
              defaultValues={{
                name: {
                  name: mode.payload.product.name,
                  id: mode.payload.product.id,
                  order: mode.payload.order,
                },
                databaseId: mode.payload.id,
                price: mode.payload.price.toString(),
              }}
              pricing={pricing}
            />
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
              hotelName={hotelName}
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
