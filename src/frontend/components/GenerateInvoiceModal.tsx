import { Dialog } from "@headlessui/react";
import { CreateInvoice, PaymentStatus } from "@/shared/types";
import { ReportItem } from "@/shared/supabase";
import { useListPricing } from "@/frontend/api/laundry/hotels.controller";
import { CancelIcon } from "@/frontend/icons/cancel.icon";

interface GenerateInvoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  paymentMethodId: number;
  summary: ReportItem[];
  hotelName: string;
}

export const GenerateInvoiceModal = ({
  isVisible,
  onClose,
  paymentMethodId,
  summary,
  hotelName,
}: GenerateInvoiceModalProps) => {
  const { pricing } = useListPricing(hotelName);

  const allProducts = pricing
    .map((item) => {
      const el = summary.find((el) => el.product.id === item.product.id);

      return {
        id: el?.product.id,
        name: el?.product.name || null,
        price: item.price,
        amount: el?.amount,
      };
    })
    .filter((item) => !!item.name);

  const sumUpPrice = allProducts.reduce((acc, item) => {
    return (acc += item.price * (item.amount as number));
  }, 0);

  const generateInvoice = () => {
    const mockObject: CreateInvoice = {
      PaymentTypeId: paymentMethodId,
      PurchasingPartyId: 0,
      ProductCurrencyPrice: sumUpPrice.toFixed(2),
      PaymentStatus: PaymentStatus.NotPaid,
      Items: allProducts.map((product) => ({
        Quantity: product.amount as number,
        ProductId: product.id as number,
      })),
    };
    console.log("generated", mockObject);
  };

  return (
    <Dialog open={isVisible} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white">
        <Dialog.Overlay />
        <Dialog.Panel className="min-w-[400px] bg-white rounded-2xl text-black p-4">
          <div className="w-full flex justify-between mb-3">
            <Dialog.Title className="font-semibold text-xl">
              Wygeneruj fakture
            </Dialog.Title>
            <button onClick={onClose}>
              <CancelIcon className="text-3xl" />
            </button>
          </div>

          <ul className="flex flex-col gap-y-2">
            {allProducts.map((product) => (
              <li key={product.name} className="flex">
                <p className="capitalize w-1/2">{product.name}</p>
                <p className="w-1/3">
                  {product.amount} x {product.price} zł
                </p>
              </li>
            ))}
          </ul>

          <div className="w-full flex items-center justify-between font-bold my-4">
            <p>W sumie:</p>
            <p>{sumUpPrice.toFixed(2)} zł</p>
          </div>

          {sumUpPrice > 0 && (
            <button
              className="text-center w-full py-3 bg-blue-500 text-white"
              onClick={generateInvoice}
            >
              Utwórz fakturę
            </button>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
