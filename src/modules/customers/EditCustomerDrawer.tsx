import { Drawer } from "@/modules/shared/Drawer";
import { useState } from "react";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { clsx } from "clsx";
import { Button } from "@/modules/shared/Button";
import { CustomerForm } from "@/modules/customers/CustomerForm";
import { Customer } from "@/modules/hotels/types";

const FORM_ID = "edit-customer";

interface EditCustomerDrawerProps {
  defaultValues: Customer;
}

export const EditCustomerDrawer = ({
  defaultValues,
}: EditCustomerDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  return (
    <Drawer
      open={open}
      title="Edytuj dane klienta"
      trigger={
        <button className="flex items-center pl-2 pr-3 py-1.5 rounded-full border border-palette-gray-100 gap-x-1 font-medium hover:bg-palette-gray-100 transition-colors">
          <PencilIcon />
          Edytuj
        </button>
      }
      footer={
        <Button
          className={clsx("w-full")}
          disabled={false}
          form={FORM_ID}
          type="submit"
        >
          Zapisz zmiany
        </Button>
      }
      toggleOpen={setOpen}
    >
      {step === "form" && (
        <CustomerForm
          formId={FORM_ID}
          defaultValues={{
            name: defaultValues.name,
            nip: defaultValues.nip?.toString(),
          }}
          onSubmit={(values) => {
            console.log("submitted values", values);
          }}
        />
      )}
    </Drawer>
  );
};
