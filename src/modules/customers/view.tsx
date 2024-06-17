import { AddNewCustomer } from "@/modules/customers/AddNewCustomer";
import { CustomersTable } from "@/modules/customers/customers-table/CustomersTable";

export const Customers = () => {
  return (
    <main className="ml-[300px] px-5 py-4 content-width">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl font-bold">Klienci</h1>

        <AddNewCustomer />
      </div>

      <CustomersTable />
    </main>
  );
};
