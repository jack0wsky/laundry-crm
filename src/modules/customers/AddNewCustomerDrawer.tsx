"use client";

import { Button } from "@/modules/shared/Button";
import { Drawer } from "@/modules/shared/Drawer";
import { useCreateCustomer } from "@/modules/customers/api/customers.controller";
import { useState } from "react";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";
import { CheckIcon } from "@/modules/shared/icons/check.icon";
import { clsx } from "clsx";
import { CustomerForm } from "@/modules/customers/CustomerForm";
import { CustomerFormValues } from "@/modules/customers/CustomerForm.schema";

const FORM_ID = "add-customer";

export const AddNewCustomerDrawer = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const { createCustomer, loading } = useCreateCustomer({
    onSuccess: () => {
      setStep("success");

      setTimeout(() => {
        setOpen(false);
        setStep("form");
      }, 1500);
    },
  });

  const addCustomer = (values: CustomerFormValues) => {
    let payload: CreateComarchCustomerPayload = {
      Name: values.name,
      CustomerTaxNumber: values.nip,
    };
    const isAddressProvided =
      values.street ||
      values.buildingNumber ||
      values.flatNumber ||
      values.postalCode ||
      values.city;

    if (isAddressProvided) {
      payload = {
        ...payload,
        Address: {
          Street: values.street as string,
          PostalCode: values.postalCode as string,
          City: values.city as string,
          BuildingNumber: values.buildingNumber as string,
          FlatNumber: values.flatNumber as string,
        },
      };
    }
    createCustomer(payload);
  };

  const isSuccess = step === "success";

  return (
    <Drawer
      open={open}
      toggleOpen={setOpen}
      hideHeader={isSuccess}
      hideFooter={isSuccess}
      title="Dodaj nowego klienta"
      trigger={
        <Button variant="secondary" onClick={() => setOpen(true)} type="button">
          Dodaj klienta
        </Button>
      }
      footer={
        <Button
          className={clsx("w-full", loading && "animate-pulse")}
          disabled={loading}
          form={FORM_ID}
          type="submit"
        >
          Dodaj klienta
        </Button>
      }
    >
      {isSuccess && (
        <div className="w-full h-full flex flex-col gap-y-5 justify-center items-center">
          <div className="w-16 h-16 bg-palette-green-500 rounded-full flex justify-center items-center">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <p className="font-bold text-xl">Klient został dodany</p>
        </div>
      )}
      {step === "form" && (
        <CustomerForm formId={FORM_ID} onSubmit={addCustomer} />
      )}
    </Drawer>
  );
};
