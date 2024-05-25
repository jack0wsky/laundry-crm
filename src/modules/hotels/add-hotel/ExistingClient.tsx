import { useListCustomers } from "@/modules/comarch/api/customers.controller";
import { SelectInput } from "@/modules/shared/SelectInput";
import { Input } from "@/modules/shared/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/modules/shared/Button";
import { useAddHotel } from "@/modules/hotels/api/hotels.controller";

const schema = z.object({
  customerName: z.string(),
  hotelName: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

interface ExistingClientProps {
  onSubmitted: () => void;
}

export const ExistingClient = ({ onSubmitted }: ExistingClientProps) => {
  const { customers } = useListCustomers();

  const { handleSubmit, setValue, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { addHotel, loading } = useAddHotel({ onSuccess: onSubmitted });

  return (
    <form
      onSubmit={handleSubmit(({ hotelName, customerName }) =>
        addHotel({ name: hotelName, customer: customerName }),
      )}
      className="flex flex-col gap-y-4"
    >
      <SelectInput
        label="Klient"
        options={customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
        }))}
        onSelect={(customerName) => setValue("customerName", customerName)}
      />

      <Input
        label="Nazwa hotelu"
        registerName="hotelName"
        register={register}
      />

      <Button
        disabled={!formState.isValid || loading}
        type="submit"
        className="w-full"
      >
        {loading ? "Dodawanie..." : "Dodaj hotel"}
      </Button>
    </form>
  );
};
