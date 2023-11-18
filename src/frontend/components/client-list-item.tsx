import { useState } from "react";
import type { Client, ClientProduct, CreateInvoice } from "@/shared/types";
import {
  ERPProductReadModel,
  PaymentMethod,
  PaymentStatus,
} from "@/shared/types";
import { ClientProducts } from "@/frontend/components/client-products";
import { ToggleIcon } from "@/frontend/icons/toggle.icon";

interface ClientListItemProps {
  client: Client;
  erpProducts: ERPProductReadModel[];
  paymentMethods: PaymentMethod[];
  onGenerateClick: (name: string) => void;
  generatedInvoices: string[];
}

export const ClientListItem = ({
  client,
  erpProducts,
  paymentMethods,
  onGenerateClick,
  generatedInvoices,
}: ClientListItemProps) => {
  const [toggleProducts, setToggleProducts] = useState(false);
  const transfer = paymentMethods.find((method) => method.Name === "Przelew");
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(
    transfer?.Id || 0,
  );

  const usedProducts: ClientProduct[] = client.products
    .filter((item) => item.amount > 0)
    .map((item) => {
      const erpProduct = erpProducts.find((erpItem) =>
        item.name.toLowerCase().includes(erpItem.name.toLowerCase()),
      );
      return {
        ProductId: erpProduct?.id || 0,
        Quantity: item.amount,
        Name: item.name,
        Price: item.price,
      };
    });

  const sumUp = client.products.reduce((acc, item) => {
    if (item.amount > 0 && item.price !== undefined) {
      return (acc += item.amount * item.price);
    }
    return acc;
  }, 0);
  const generateInvoice = () => {
    const mockObject: CreateInvoice = {
      PaymentTypeId: selectedPaymentMethodId,
      PurchasingPartyId: 0,
      ProductCurrencyPrice: sumUp.toFixed(2),
      PaymentStatus: PaymentStatus.NotPaid,
      Items: usedProducts,
    };
    console.log("generated", mockObject);
    onGenerateClick(client.name);
  };

  if (generatedInvoices.includes(client.name)) return null;

  return (
    <div className="p-4 bg-white flex flex-col rounded-md">
      <div className="flex w-full justify-between">
        <p>{client.name}</p>

        <button onClick={() => setToggleProducts((prevState) => !prevState)}>
          <ToggleIcon className="text-2xl" />
        </button>
      </div>

      {toggleProducts && <ClientProducts products={usedProducts} />}

      <div className="mt-4 flex flex-col">
        <p>Faktura: {sumUp.toFixed(2)} zł</p>
        <select
          className="py-2 px-4 bg-gray-200"
          defaultValue={selectedPaymentMethodId}
          onChange={({ target }) =>
            setSelectedPaymentMethodId(Number(target.value))
          }
        >
          {paymentMethods.map((method) => (
            <option key={method.Id} value={method.Id}>
              {method.Name}
            </option>
          ))}
        </select>
        <button
          onClick={generateInvoice}
          className="px-5 py-2.5 rounded-full bg-teal-700 text-white cursor-pointer mt-3"
        >
          Generuj fakturę
        </button>
      </div>
    </div>
  );
};
