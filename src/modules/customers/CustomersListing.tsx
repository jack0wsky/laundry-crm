"use client";

import { useListCustomersWithHotels } from "@/modules/customers/api/customers.controller";
import { CustomerListItem } from "@/modules/customers/CustomerListItem";

export const CustomersListing = () => {
  const { customers, loading } = useListCustomersWithHotels();

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-y-3 px-5 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full rounded-lg bg-white h-[142px] p-4">
            <div className="w-[200px] h-7 rounded-md bg-palette-gray-100 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-col mt-10 px-5 pb-8 gap-y-3">
      {customers.map((customer) => (
        <CustomerListItem key={customer.id} customer={customer} />
      ))}
    </ul>
  );
};
