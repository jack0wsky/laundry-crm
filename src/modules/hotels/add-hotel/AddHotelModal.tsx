import { useState } from "react";
import { Modal } from "@/modules/shared/Modal";
import { Button } from "@/modules/shared/Button";
import { NewClient } from "@/modules/hotels/add-hotel/NewClient";

interface AddHotelModalProps {
  open: boolean;
  onClose: () => void;
}
export const AddHotelModal = ({ open, onClose }: AddHotelModalProps) => {
  const [clientType, setClientType] = useState<"existing" | "new" | null>(
    "existing",
  );

  return (
    <Modal title="Dodaj hotel" open={open} onClose={onClose}>
      {clientType === "new" && (
        <NewClient onGoBack={() => setClientType(null)} />
      )}

      {!clientType && (
        <div className="max-w-[450px]">
          <p>
            Wybierz, czy dodajesz hotel do już istniejącego w aplikacji klienta
            czy zupełnie nowego
          </p>
          <div className="w-full flex items-center gap-x-3 mt-6">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => setClientType("existing")}
            >
              Istniejący klient
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => setClientType("new")}
            >
              Nowy klient
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
