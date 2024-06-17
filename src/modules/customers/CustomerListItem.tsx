import { ComarchCustomerReadModel } from "@/modules/comarch/types";

interface CustomerListItemProps {
  customer: ComarchCustomerReadModel;
}

export const CustomerListItem = ({ customer }: CustomerListItemProps) => {
  return (
    <li className="w-full bg-white rounded-md p-3">
      <p className="font-medium">{customer.name}</p>
      <p className="text-sm">NIP: {customer.customerTaxNumber}</p>
    </li>
  );
};
