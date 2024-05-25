import { useForm } from "react-hook-form";
import { Input } from "@/modules/shared/Input";
import { Button } from "@/modules/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  newCustomerSchema,
  NewCustomerValues,
} from "@/modules/hotels/add-hotel/schemas";
import { HotelName } from "@/modules/hotels/add-hotel/new-client/HotelName";

interface NewClientProps {
  onGoBack: () => void;
}
export const NewClient = ({ onGoBack }: NewClientProps) => {
  const [step, setStep] = useState<"customer" | "hotelName">("customer");
  const [clientData, setClientData] = useState<NewCustomerValues | null>(null);

  const { register, handleSubmit, formState } = useForm<NewCustomerValues>({
    resolver: zodResolver(newCustomerSchema),
  });

  const nipError = formState.errors.nip;
  const nameError = formState.errors.name;
  const isValid = formState.isValid;

  const saveCustomer = (data: NewCustomerValues) => {
    setStep("hotelName");
    setClientData(data);
  };

  if (step === "hotelName") {
    return (
      <HotelName
        onEdit={() => setStep("customer")}
        customerData={clientData as NewCustomerValues}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(saveCustomer)}>
      <p className="mb-5 text-black">Nowy klient</p>
      <fieldset className="flex flex-col gap-y-5">
        <Input
          label="NIP"
          register={register}
          registerName="nip"
          error={nipError}
        />
        <Input
          label="Nazwa firmy"
          register={register}
          registerName="name"
          error={nameError}
        />
      </fieldset>

      <div className="flex items-center w-full gap-x-3 mt-6">
        <Button
          variant="secondary"
          type="button"
          onClick={onGoBack}
          className="w-full"
        >
          Wróć
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
          className="w-full"
        >
          Dalej
        </Button>
      </div>
    </form>
  );
};
