import { Dialog } from "@headlessui/react";
import { CreateInvoice, PaymentStatus } from "@/modules/hotels/reports/types";
import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import {
  ProvidedProduct,
  getAmounts,
} from "@/modules/utils/get-total-hotel-usage";
import { CheckIcon } from "@/modules/shared/icons/check.icon";
import { Button } from "@/modules/shared/Button";
import { usePaymentMethod } from "@/modules/comarch/usePaymentMethod";
import axios from "axios";
import classNames from "classnames";
import { useState } from "react";
import { useMutation } from "react-query";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useRouter } from "next/router";

interface GenerateInvoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  summary: ReportItem[];
  pricing: Pricing[];
  customerId: number;
}

export const GenerateInvoiceModal = ({
  isVisible,
  onClose,
  summary,
  pricing,
  customerId,
}: GenerateInvoiceModalProps) => {
  const [invoiceCreated, setInvoiceCreated] = useState(false);

  const {
    data: invoiceId,
    isLoading,
    mutate: generateInvoice,
  } = useMutation<number, Error, CreateInvoice>(
    async (payload: CreateInvoice) => {
      const { data } = await axios.post("/api/invoices/create", payload);
      return data;
    },
    {
      onSuccess: () => {
        setInvoiceCreated(true);
      },
    },
  );

  return (
    <Dialog open={isVisible} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white">
        <Dialog.Overlay />
        <Dialog.Panel className="min-w-[400px] bg-white rounded-2xl text-black p-4">
          {invoiceCreated && (
            <GenerateInvoiceSuccess
              onClose={onClose}
              invoiceId={invoiceId as number}
            />
          )}

          {!invoiceCreated && (
            <InvoiceSummary
              summary={summary}
              onClose={onClose}
              pricing={pricing}
              customerId={customerId}
              onCreate={{
                action: generateInvoice,
                loading: isLoading,
              }}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

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

const InvoiceSummary = ({
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

  const generateInvoice = async () => {
    onCreate.action({
      PaymentTypeId: selectedPaymentMethodId,
      PurchasingPartyId: customerId,
      ProductCurrencyPrice: Number(sumUpPrice.toFixed(2)),
      PaymentStatus: PaymentStatus.NotPaid,
      BankAccountId: 10158354,
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
                className={classNames(
                  "w-full flex justify-center items-center py-2 rounded-full font-bold",
                  { "bg-white": paymentMethod.id === selectedPaymentMethodId },
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

interface GenerateInvoiceSuccessProps {
  onClose: () => void;
  invoiceId: number;
}
const GenerateInvoiceSuccess = ({
  onClose,
  invoiceId,
}: GenerateInvoiceSuccessProps) => {
  const { hotels } = useListHotels();
  const router = useRouter();

  const currentHotelId = router.query.hotelId;

  const currentHotelIndex = hotels.findIndex(
    (hotel) => hotel.id === currentHotelId,
  );

  const nextHotel = hotels[currentHotelIndex + 1];

  const redirectUrl = `https://app.erpxt.pl/index.html#/invoice/${invoiceId}`;
  return (
    <>
      <div className="w-full flex justify-end items-center mb-4">
        <button
          onClick={onClose}
          className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full"
        >
          <CancelIcon className="text-2xl" />
        </button>
      </div>
      <div className="flex w-full justify-center items-center flex-col py-12 mb-4">
        <div className="h-16 w-16 rounded-full bg-green-500 flex justify-center items-center mb-7">
          <CheckIcon className="text-4xl text-white" />
        </div>
        <h2 className="font-bold text-xl text-gray-800">Faktura gotowa!</h2>
      </div>
      <div className="flex items-center w-full gap-x-3">
        <Button href={redirectUrl} variant="secondary" className="w-full">
          Zobacz fakturę
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            onClose();
            router.push(`/${nextHotel.id}`);
          }}
        >
          Następny hotel
        </Button>
      </div>
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
    <ul className="flex flex-col gap-y-1">
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
