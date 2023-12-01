import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CancelIcon } from "@/frontend/icons/cancel.icon";
import {
  useAddPrice,
  useListPricing,
  useListProducts,
} from "@/frontend/api/laundry/hotels.controller";
import { db } from "@/frontend/laundry.db";

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
  const { products } = useListProducts();
  const { addPrice } = useAddPrice();

  const [prices, setPrices] = useState<
    {
      hotelName: string;
      price: number;
      productId: number;
    }[]
  >([]);

  console.log(prices);

  const save = async () => {
    await db.setPrices(
      prices.map((item) => ({
        hotel: item.hotelName,
        price: item.price,
        product: item.productId,
      })),
    );
  };

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
            {products.map((item) => (
              <Product
                key={item.id}
                name={item.name}
                price={0}
                onChange={(value) => {
                  console.log(value);
                  setPrices((prev) => [
                    ...prev,
                    { price: value, productId: item.id, hotelName },
                  ]);
                }}
              />
            ))}
          </ul>

          <button onClick={save} className='px-3 bg-black text-white'>Zapisz</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const Product = ({
  name,
  price,
  onChange,
}: {
  name: string;
  price: number;
  onChange: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>();

  return (
    <li className="w-full flex justify-between border-b pb-3 items-center">
      <p className="font-medium text-lg capitalize">{name}</p>
      <input
        type="number"
        placeholder="Cena"
        value={value}
        onChange={(event) => {
          setValue(Number(event.target.value));
        }}
        className="bg-gray-100 p-2"
      />
      <button onClick={() => onChange(value as number)} className='px-3 py-2 bg-black text-white'>save</button>
    </li>
  );
};
