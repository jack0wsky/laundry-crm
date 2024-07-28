import { AddNewCustomerDrawer } from "@/modules/customers/AddNewCustomerDrawer";
import { AbstractBackground } from "@/modules/shared/AbstractBackground";
import { CustomersListing } from "@/modules/customers/CustomersListing";

export const CustomersPage = () => {
  return (
    <main className="ml-[300px] content-width relative">
      <AbstractBackground />
      <div className="w-full flex items-center justify-between px-5 pt-6">
        <h1 className="text-4xl font-bold text-white">Klienci</h1>

        <AddNewCustomerDrawer />
      </div>

      <CustomersListing />
    </main>
  );
};
