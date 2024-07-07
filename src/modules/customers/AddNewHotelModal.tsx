import { Modal } from "@/modules/shared/Modal";
import { ExistingClient } from "@/modules/hotels/add-hotel/ExistingClient";
import { useAddHotel } from "@/modules/hotels/api/hotels.controller";

interface AddNewHotelModalProps {
  customerName: string;
  open: boolean;
  onClose: () => void;
}

export const AddNewHotelModal = ({
  customerName,
  open,
  onClose,
}: AddNewHotelModalProps) => {
  const { addHotel, loading } = useAddHotel();

  return (
    <Modal title="Dodaj hotel" open={open} onClose={onClose}>
      <ExistingClient
        submitLabel="Dodaj hotel"
        onSubmit={(values) =>
          addHotel({ name: values.hotelName, customer: customerName })
        }
        loading={loading}
      />
    </Modal>
  );
};
