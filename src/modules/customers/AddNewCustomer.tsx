import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/modules/shared/Input";
import { Button } from "@/modules/shared/Button";
import { Drawer } from "@/modules/shared/Drawer";
import { useCreateCustomer } from "@/modules/customers/api/customers.controller";
import { useState } from "react";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";
import { CheckIcon } from "@/modules/shared/icons/check.icon";

const schema = z.object({
  name: z.string(),
  nip: z.string().min(10).max(10),
  email: z.string().email().or(z.string().optional()),
  phone: z.string().min(9).max(9).optional().or(z.string().optional()),
  street: z.string().optional(),
  buildingNumber: z.string().optional(),
  flatNumber: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const AddNewCustomer = () => {
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

  const { handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const addCustomer = (values: FormValues) => {
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

  return (
    <Drawer
      open={open}
      toggleOpen={setOpen}
      hideHeader={step === "success"}
      hideFooter={step === "success"}
      title="Dodaj nowego klienta"
      trigger={
        <Button onClick={() => setOpen(true)} type="button">
          Dodaj klienta
        </Button>
      }
      footer={
        <Button
          className="w-full"
          disabled={!formState.isValid || loading}
          form="add-customer"
          type="submit"
        >
          {loading ? "Dodawanie hotelu..." : "Dodaj hotel"}
        </Button>
      }
    >
      {step === "success" && (
        <div className="w-full h-full flex flex-col gap-y-5 justify-center items-center">
          <div className="w-16 h-16 bg-palette-green-500 rounded-full flex justify-center items-center">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <p className="font-bold text-xl">Klient został dodany</p>
        </div>
      )}
      {step === "form" && (
        <form id="add-customer" onSubmit={handleSubmit(addCustomer)}>
          <div className="flex flex-col px-5 gap-y-4">
            <p className="font-semibold">Podstawowe dane</p>
            <fieldset className="flex flex-col gap-y-6">
              <Input
                label="Nazwa firmy"
                registerName="name"
                register={register}
              />
              <Input label="NIP" registerName="nip" register={register} />
              <Input label="E-mail" registerName="email" register={register} />
              <Input label="Telefon" registerName="phone" register={register} />
            </fieldset>
          </div>

          <div className="w-full border-b border-palette-gray-100 my-6" />

          <div className="flex flex-col px-5 gap-y-4">
            <div className="w-full flex justify-between text-base">
              <p className="font-semibold">Adres</p>
              <p className="text-palette-gray-600 italic">opcjonalny</p>
            </div>
            <fieldset className="flex flex-col gap-y-6">
              <Input
                label="Ulica"
                registerName="street"
                autoComplete="off"
                className="w-full"
                register={register}
              />
              <div className="w-full flex items-center gap-x-5">
                <Input
                  label="Number budynku"
                  registerName="buildingNumber"
                  className="w-full"
                  autoComplete="off"
                  register={register}
                />
                <Input
                  label="Numer mieszkania"
                  registerName="flatNumber"
                  className="w-[160px]"
                  autoComplete="off"
                  register={register}
                />
              </div>

              <div className="w-full flex items-center gap-x-5">
                <Input
                  label="Kod pocztowy"
                  className="w-[160px]"
                  registerName="postalCode"
                  autoComplete="off"
                  register={register}
                />
                <Input
                  label="Miasto"
                  className="w-full"
                  autoComplete="off"
                  registerName="city"
                  register={register}
                />
              </div>
            </fieldset>
          </div>
        </form>
      )}
    </Drawer>
  );
};
