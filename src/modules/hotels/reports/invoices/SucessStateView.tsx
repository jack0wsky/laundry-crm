import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useRouter } from "next/router";
import { CancelIcon } from "@/modules/shared/icons/cancel.icon";
import { CheckIcon } from "@/modules/shared/icons/check.icon";
import { Button } from "@/modules/shared/Button";

interface GenerateInvoiceSuccessProps {
  onClose: () => void;
  invoiceId: number;
}
export const SuccessStateView = ({
  onClose,
  invoiceId,
}: GenerateInvoiceSuccessProps) => {
  const { hotels } = useListHotels();
  const router = useRouter();

  const currentHotelId = router.query.hotelId;

  const currentHotelIndex = hotels.findIndex(
    (hotel) => hotel.id === currentHotelId,
  );

  const nextHotel = hotels[currentHotelIndex + 1];

  const redirectUrl = `https://app.erpxt.pl/index.html#/invoice/${invoiceId}`;
  return (
    <>
      <div className="w-full flex justify-end items-center mb-4">
        <button
          onClick={onClose}
          className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-full"
        >
          <CancelIcon className="text-2xl" />
        </button>
      </div>
      <div className="flex w-full justify-center items-center flex-col py-12 mb-4">
        <div className="h-16 w-16 rounded-full bg-green-500 flex justify-center items-center mb-7">
          <CheckIcon className="text-4xl text-white" />
        </div>
        <h2 className="font-bold text-xl text-gray-800">Faktura gotowa!</h2>
      </div>
      <div className="flex items-center w-full gap-x-3">
        <Button href={redirectUrl} variant="secondary" className="w-full">
          Zobacz fakturę
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            onClose();
            router.push(`/${nextHotel.id}`);
          }}
        >
          Następny hotel
        </Button>
      </div>
    </>
  );
};
