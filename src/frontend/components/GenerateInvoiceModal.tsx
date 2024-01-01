import { Dialog } from "@headlessui/react";
import { CreateInvoice, PaymentStatus } from "@/shared/types";
import { ReportItem, Pricing } from "@/shared/supabase";
import { CancelIcon } from "@/frontend/icons/cancel.icon";
import { getAmounts } from "@/frontend/utils/get-total-hotel-usage";
import { CheckIcon } from "@/frontend/icons/check.icon";
import { Button } from "@/frontend/components/shared/Button";
import { usePaymentMethod } from "@/frontend/components/use-payment-method";
import axios from "axios";
import { useMutation } from "react-query";

interface GenerateInvoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  summary: ReportItem[];
  pricing: Pricing[];
  customerId: number;
}

const useGenerateInvoice = () => {
  const { mutate, isLoading, data } = useMutation(
    async (payload: CreateInvoice) => {
      const { data: tokenData } = await axios.get("/api/erp/auth");
      const { data } = await axios.post(
        "https://app.erpxt.pl/api2/public/v1.4/invoices",
        payload,
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      return data;
    },
  );

  return {
    generateInvoice: mutate,
    loading: isLoading,
    invoiceId: data,
  };
};

export const GenerateInvoiceModal = ({
  isVisible,
  onClose,
  summary,
  pricing,
  customerId,
}: GenerateInvoiceModalProps) => {
  const { generateInvoice, loading } = useGenerateInvoice();

  return (
    <Dialog open={isVisible} onClose={onClose} className="z-50 bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white">
        <Dialog.Overlay />
        <Dialog.Panel className="min-w-[400px] bg-white rounded-2xl text-black p-4">
          <InvoiceSummary
            summary={summary}
            onClose={onClose}
            pricing={pricing}
            customerId={customerId}
            onCreate={{
              action: generateInvoice,
              loading,
            }}
          />
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
  const { selectedPaymentMethod, paymentMethods, changePaymentMethod } =
    usePaymentMethod();

  const sumUpPrice = providedProducts.reduce((acc, item) => {
    return (acc += item.price * (item.amount as number));
  }, 0);

  const generateInvoice = async () => {
    const mockObject: CreateInvoice = {
      PaymentTypeId: selectedPaymentMethod,
      PurchasingPartyId: customerId,
      ProductCurrencyPrice: Number(sumUpPrice.toFixed(2)),
      PaymentStatus: PaymentStatus.NotPaid,
      BankAccountId: 10158354,
      Items: providedProducts.map((product) => ({
        Quantity: product.amount as number,
        ProductId: product.product.id as number,
        ProductCurrencyPrice: product.price,
      })),
    };
    console.log("generated", mockObject);

    onCreate.action(mockObject);
  };

  return (
    <>
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

      <div className="flex items-center">
        <select
          onChange={(event) => changePaymentMethod(Number(event.target.value))}
        >
          {paymentMethods.map((method) => (
            <option
              selected={method.id === 10238815}
              key={method.id}
              value={method.id}
            >
              {method.name}
            </option>
          ))}
        </select>
        {sumUpPrice > 0 && (
          <Button
            className="w-full"
            onClick={generateInvoice}
            disabled={paymentMethods.length === 0 || onCreate.loading}
          >
            {onCreate.loading ? "Generowanie faktury..." : "Generuj fakturę"}
          </Button>
        )}
      </div>
    </>
  );
};

interface GenerateInvoiceSuccessProps {
  onClose: () => void;
  invoiceId: string | undefined;
}
const GenerateInvoiceSuccess = ({
  onClose,
  invoiceId,
}: GenerateInvoiceSuccessProps) => {
  const redirectUrl = `https://app.erpxt.pl/index.html#/invoice/${invoiceId}`;
  return (
    <div>
      <div className="flex w-full justify-center items-center flex-col py-4 mb-4">
        <div className="h-20 w-20 rounded-full bg-green-500 flex justify-center items-center mb-5">
          <CheckIcon className="text-5xl text-white" />
        </div>
        <h2 className="font-medium text-2xl text-gray-800">
          Faktura utworzona
        </h2>
      </div>
      <div className="flex items-center w-full gap-x-3">
        <Button href={redirectUrl} variant="secondary" className="w-full">
          Zobacz fakturę
        </Button>
        <Button variant="secondary" className="w-full" onClick={onClose}>
          Zamknij
        </Button>
      </div>
    </div>
  );
};
