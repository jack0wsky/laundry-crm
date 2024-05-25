import { useForm } from "react-hook-form";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { Input } from "@/modules/shared/Input";
import { NewCustomerValues } from "@/modules/hotels/add-hotel/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/modules/shared/Button";
import {
  useAddCustomer,
  useAddHotel,
} from "@/modules/hotels/api/hotels.controller";

interface HotelNameProps {
  onEdit: () => void;
  customerData: NewCustomerValues;
}

const schema = z.object({
  hotelName: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export const HotelName = ({ onEdit, customerData }: HotelNameProps) => {
  const { register, formState, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { addCustomer } = useAddCustomer();
  const { addHotel } = useAddHotel();

  const hotelNameError = formState.errors.hotelName;

  const saveHotel = ({ hotelName }: FormValues) => {
    addCustomer(
      { name: customerData.name, nip: Number(customerData.nip) },
      {
        onSuccess: () => {
          addHotel({ name: hotelName, customer: customerData.name });
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex px-3 py-2 border border-palette-gray-100 rounded-lg justify-between items-center">
        <div className="flex flex-col">
          <p>{customerData.name}</p>
          <p>NIP: {customerData.nip}</p>
        </div>

        <button
          onClick={onEdit}
          className="h-10 w-10 flex justify-center items-center border border-palette-gray-100 hover:bg-palette-gray-100 hover:border-palette-gray-600 rounded-md"
        >
          <PencilIcon className="text-xl" />
        </button>
      </div>

      <form className="mt-3" onSubmit={handleSubmit(saveHotel)}>
        <Input
          label="Nazwa hotelu"
          registerName="hotelName"
          register={register}
          error={hotelNameError}
        />

        <Button
          className="w-full mt-6"
          variant="primary"
          disabled={!formState.isValid}
          type="submit"
        >
          Dodaj hotel
        </Button>
      </form>
    </div>
  );
};
