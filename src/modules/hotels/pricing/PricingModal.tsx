import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import {
  useListPricing,
  useUpdatePrice,
} from "@/modules/hotels/pricing/api/pricing.controller";
import { Button } from "@/modules/shared/Button";
import { PricingListingItem } from "@/modules/hotels/pricing/PricingListingItem";
import { AddProductForm } from "@/modules/hotels/pricing/AddProductForm";

interface PricingModalProps {
  isVisible: boolean;
  hotelName: string;
  onClose: () => void;
}

export const PricingModal = ({
  hotelName,
  isVisible,
  onClose,
}: PricingModalProps) => {
  const [mode, setMode] = useState<"pricing" | "add-product">("pricing");

  return (
    <Dialog open={isVisible} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white">
        <Dialog.Overlay />

        <Dialog.Panel className="min-w-[450px] bg-white rounded-2xl text-black p-4">
          <div className="w-full flex justify-between mb-3">
            <Dialog.Title className="font-semibold text-xl">
              {mode === "pricing" && "Cennik"}
              {mode === "add-product" && "Dodaj produkt"}
            </Dialog.Title>
            <button onClick={onClose}>
              <CancelIcon className="text-3xl" />
            </button>
          </div>

          {mode === "pricing" && (
            <PricingListing
              hotelName={hotelName}
              onAddProduct={() => setMode("add-product")}
            />
          )}

          {mode === "add-product" && (
            <AddProductForm
              hotelName={hotelName}
              onProductAdded={() => setMode("pricing")}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

interface PricingListingProps {
  onAddProduct: () => void;
  hotelName: string;
}
const PricingListing = ({ onAddProduct, hotelName }: PricingListingProps) => {
  const { pricing } = useListPricing(hotelName);
  const { updatePrice } = useUpdatePrice();

  return (
    <>
      <Button
        className="w-full my-4"
        variant="secondary"
        onClick={onAddProduct}
      >
        Dodaj produkt
      </Button>

      <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
        {pricing.map((item) => (
          <PricingListingItem
            key={`${item.id}-${item.product.name}`}
            name={item.product.name}
            price={item.price}
            onSave={(price) => {
              updatePrice({
                id: item.id,
                price,
                hotelName: item.hotel,
              });
            }}
          />
        ))}
      </ul>
    </>
  );
};
