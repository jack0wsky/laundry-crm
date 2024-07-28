import { Input } from "@/modules/shared/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  CustomerFormValues,
} from "@/modules/customers/CustomerForm.schema";

interface CustomerFormProps {
  formId: string;
  onSubmit: (values: CustomerFormValues) => void;
  defaultValues?: Partial<CustomerFormValues>;
}

export const CustomerForm = ({
  formId,
  onSubmit,
  defaultValues,
}: CustomerFormProps) => {
  const { handleSubmit, register, formState } = useForm<CustomerFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col px-5 gap-y-4">
        <p className="font-semibold">Podstawowe dane</p>
        <fieldset className="flex flex-col gap-y-6">
          <Input label="Nazwa firmy" registerName="name" register={register} />
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
  );
};
