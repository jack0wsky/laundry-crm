"use client";

import { useListCustomersWithHotels } from "@/modules/customers/api/customers.controller";
import { CustomerListItem } from "@/modules/customers/CustomerListItem";

export const CustomersListing = () => {
  const { customers } = useListCustomersWithHotels();

  return (
    <ul className="flex flex-col mt-10 px-5 pb-8 gap-y-3">
      {customers.map((customer) => (
        <CustomerListItem key={customer.id} customer={customer} />
      ))}
    </ul>
  );
};
