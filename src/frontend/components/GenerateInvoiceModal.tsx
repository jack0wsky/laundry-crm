import { Dialog } from "@headlessui/react";
import { CreateInvoice, PaymentStatus } from "@/shared/types";
import { ReportItem, Pricing } from "@/shared/supabase";
import { CancelIcon } from "@/frontend/icons/cancel.icon";
import { getAmounts } from "@/frontend/utils/get-total-hotel-usage";

interface GenerateInvoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  paymentMethodId: number;
  summary: ReportItem[];
  pricing: Pricing[];
}

export const GenerateInvoiceModal = ({
  isVisible,
  onClose,
  paymentMethodId,
  summary,
  pricing,
}: GenerateInvoiceModalProps) => {
  const providedProducts = getAmounts(summary, pricing);

  const sumUpPrice = providedProducts.reduce((acc, item) => {
    return (acc += item.price * (item.amount as number));
  }, 0);

  const generateInvoice = () => {
    const mockObject: CreateInvoice = {
      PaymentTypeId: paymentMethodId,
      PurchasingPartyId: 0,
      ProductCurrencyPrice: sumUpPrice.toFixed(2),
      PaymentStatus: PaymentStatus.NotPaid,
      Items: providedProducts.map((product) => ({
        Quantity: product.amount as number,
        ProductId: product.product.id as number,
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
            {providedProducts.map((product) => (
              <li key={product.product.name} className="flex">
                <p className="capitalize w-1/2">{product.product.name}</p>
                <p className="w-1/3">
                  {product.amount} x {product.price.toFixed(2)} zł
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
