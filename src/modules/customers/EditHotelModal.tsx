import {
  ExistingClient,
  FormValues,
} from "@/modules/hotels/add-hotel/ExistingClient";
import { Modal } from "@/modules/shared/Modal";
import { useUpdateHotelName } from "@/modules/hotels/api/hotels.controller";

interface AddHotelModalProps {
  open: boolean;
  onClose: () => void;
  defaultValues: FormValues;
  hotelId: string;
}

export const EditHotelModal = ({
  open,
  onClose,
  defaultValues,
  hotelId,
}: AddHotelModalProps) => {
  const { updateName, loading } = useUpdateHotelName();

  return (
    <Modal title="Edytuj hotel" open={open} onClose={onClose}>
      <ExistingClient
        defaultValues={defaultValues}
        loading={loading}
        onSubmit={(values) =>
          updateName({ name: values.hotelName, id: hotelId })
        }
        submitLabel="Edytuj hotel"
      />
    </Modal>
  );
};
