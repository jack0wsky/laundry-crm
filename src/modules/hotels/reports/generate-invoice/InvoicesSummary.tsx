import { CreateInvoice, PaymentStatus } from "@/modules/hotels/reports/types";
import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import {
  getAmounts,
  ProvidedProduct,
} from "@/modules/utils/get-total-hotel-usage";
import { usePaymentMethod } from "@/modules/comarch/usePaymentMethod";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import sub from "date-fns/sub";
import { Dialog } from "@headlessui/react";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import { clsx } from "clsx";
import { Button } from "@/modules/shared/Button";

interface InvoiceSummaryProps {
  onClose: () => void;
  onCreate: {
    loading: boolean;
    action: (payload: CreateInvoice) => void;
  };
  summary: ReportItem[];
  pricing: Pricing[];
  customerId: number;
}

export const InvoiceSummary = ({
  summary,
  pricing,
  onClose,
  onCreate,
  customerId,
}: InvoiceSummaryProps) => {
  const providedProducts = getAmounts(summary, pricing);
  const { paymentMethods, selectedPaymentMethodId, changePaymentMethod } =
    usePaymentMethod();

  const sumUpPrice = providedProducts.reduce((acc, item) => {
    return (acc += item.price * (item.amount as number));
  }, 0);

  const lastDayOfPreviousMonth = lastDayOfMonth(sub(new Date(), { months: 1 }));

  const generateInvoice = async () => {
    const MAIN_BANK_ACCOUNT_ID = 10158354;

    onCreate.action({
      PaymentTypeId: selectedPaymentMethodId,
      PurchasingPartyId: customerId,
      ProductCurrencyPrice: Number(sumUpPrice.toFixed(2)),
      PaymentStatus: PaymentStatus.NotPaid,
      BankAccountId: MAIN_BANK_ACCOUNT_ID,
      SalesDate: lastDayOfPreviousMonth.toISOString(),
      Items: providedProducts.map((product) => ({
        Quantity: product.amount,
        ProductId: product.product.id,
        ProductCurrencyPrice: product.price,
      })),
    });
  };

  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <Dialog.Title className="font-semibold text-xl">
          Podsumowanie
        </Dialog.Title>
        <button
          onClick={onClose}
          className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full"
        >
          <CancelIcon className="text-2xl" />
        </button>
      </div>

      {providedProducts.length === 0 && <EmptyState />}

      {providedProducts.length > 0 && (
        <>
          <ProductsListing products={providedProducts} />

          <div className="w-full flex items-center justify-between font-bold my-7">
            <p>W sumie:</p>
            <p>{sumUpPrice.toFixed(2)} zł</p>
          </div>

          <div className="w-full flex justify-center items-center p-1 bg-gray-200 rounded-full">
            {paymentMethods.map((paymentMethod) => (
              <button
                key={paymentMethod.id}
                className={clsx(
                  "w-full flex justify-center items-center py-2 rounded-full font-bold",
                  paymentMethod.id === selectedPaymentMethodId && "bg-white",
                )}
                onClick={() => changePaymentMethod(paymentMethod.id)}
              >
                {paymentMethod.name}
              </button>
            ))}
          </div>

          <div className="flex items-center mt-5">
            {sumUpPrice > 0 && (
              <Button
                className="w-full"
                onClick={generateInvoice}
                disabled={paymentMethods.length === 0 || onCreate.loading}
              >
                {onCreate.loading
                  ? "Generowanie faktury..."
                  : "Generuj fakturę"}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

const EmptyState = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center h-[200px]">
      <h3 className="text-xl font-medium">Brak danych</h3>
      <p className="w-3/4 text-center mt-3">
        Wpisz ilości usług, aby zobaczyć podsumowanie
      </p>
    </div>
  );
};

interface ProductsListingProps {
  products: ProvidedProduct[];
}
const ProductsListing = ({ products }: ProductsListingProps) => {
  return (
    <ul className="flex flex-col gap-y-1 h-[190px] overflow-y-auto">
      {products.map((product) => (
        <li
          key={product.product.name}
          className="flex py-2 border-b border-gray-200"
        >
          <p className="capitalize w-1/2 text-base font-medium">
            {product.product.name}
          </p>
          <p className="w-1/3 font-medium">
            {product.amount} x {product.price.toFixed(2)} zł
          </p>
          <p className="w-1/3 text-right font-bold">
            {(product.amount * product.price).toFixed(2)} zł
          </p>
        </li>
      ))}
    </ul>
  );
};
