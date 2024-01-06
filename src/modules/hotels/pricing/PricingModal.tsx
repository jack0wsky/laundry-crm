import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import {
  useListPricing,
  useUpdatePrice,
} from "@/modules/hotels/pricing/api/pricing.controller";
import { Button } from "@/modules/shared/Button";

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
  const { pricing } = useListPricing(hotelName);
  const { updatePrice } = useUpdatePrice();

  return (
    <Dialog open={isVisible} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white">
        <Dialog.Overlay />

        <Dialog.Panel className="min-w-[450px] bg-white rounded-2xl text-black p-4">
          <div className="w-full flex justify-between mb-3">
            <Dialog.Title className="font-semibold text-xl">
              Cennik
            </Dialog.Title>
            <button onClick={onClose}>
              <CancelIcon className="text-3xl" />
            </button>
          </div>

          <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
            {pricing.map((item) => (
              <Product
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const Product = ({
  name,
  price,
  onSave,
}: {
  name: string;
  price: number;
  onSave: (price: number) => void;
}) => {
  const [value, setValue] = useState<number>(price);

  return (
    <li className="w-full flex justify-between border-b pb-3 items-center">
      <p className="font-medium text-lg capitalize mr-2">{name}</p>
      <div className="flex items-center gap-x-3">
        <input
          type="number"
          placeholder="Cena"
          value={value}
          onChange={(event) => {
            setValue(Number(event.target.value));
          }}
          className="bg-gray-100 p-2"
        />
        <Button
          variant="secondary"
          disabled={price === value}
          onClick={() => onSave(value)}
        >
          Zapisz
        </Button>
      </div>
    </li>
  );
};
