import { CustomerWithHotels } from "@/modules/services/laundry.db";
import { PlusIcon } from "@/modules/shared/icons/plus.icon";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { TrashIcon } from "@/modules/shared/icons/trash.icon";
import { HotelListItem } from "@/modules/customers/HotelListItem";
import { EditHotelModal } from "@/modules/customers/EditHotelModal";
import { useState } from "react";
import { AddNewHotelModal } from "@/modules/customers/AddNewHotelModal";
import { EditCustomerDrawer } from "@/modules/customers/EditCustomerDrawer";

interface CustomerListItemProps {
  customer: CustomerWithHotels;
}

export const CustomerListItem = ({ customer }: CustomerListItemProps) => {
  const [openNewHotelModal, setOpenNewHotelModal] = useState(false);
  const [editMode, setEditMode] = useState<{
    hotelId: string;
    hotelName: string;
  } | null>(null);

  return (
    <>
      <AddNewHotelModal
        customerName={customer.name}
        open={openNewHotelModal}
        onClose={() => setOpenNewHotelModal(false)}
      />

      {!!editMode && (
        <EditHotelModal
          hotelId={editMode.hotelId}
          defaultValues={{
            hotelName: editMode.hotelName,
          }}
          open
          onClose={() => setEditMode(null)}
        />
      )}

      <li className="w-full bg-white rounded-lg p-4 flex items-start justify-between">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-y-1">
            <p
              className="font-medium text-xl max-w-[400px]"
              title={customer.name}
            >
              {customer.name}
            </p>
            <p className="font-bold text-xs text-palette-gray-400">
              NIP: {customer.nip}
            </p>
          </div>
        </div>

        {customer.hotels.length > 0 && (
          <ul className="grid grid-cols-2 gap-2">
            {customer.hotels.map((hotel) => (
              <HotelListItem
                key={hotel.id}
                hotel={hotel}
                onEditClick={() =>
                  setEditMode({ hotelId: hotel.id, hotelName: hotel.name })
                }
              />
            ))}
            <li>
              <button
                onClick={() => setOpenNewHotelModal(true)}
                className="w-[250px] py-3 rounded-full border border-dashed border-palette-blue-600/20 hover:border-palette-blue-600 transition-colors text-palette-blue-600 flex items-center justify-center gap-x-1 font-medium"
              >
                <PlusIcon className="text-xl" />
                Dodaj hotel
              </button>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};
