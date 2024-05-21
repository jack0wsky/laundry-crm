import {useEffect, useState} from "react";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { Button } from "@/modules/shared/Button";
import { useUpdateHotelName } from "@/modules/hotels/api/hotels.controller";

interface HotelNameProps {
  id: string;
  name: string;
}

export const HotelName = ({ id, name }: HotelNameProps) => {
  const [editMode, setEditMode] = useState(false);
  const [hotelName, setHotelName] = useState(name);

  useEffect(() => {
    setHotelName(name);
  }, []);

  const { updateName } = useUpdateHotelName({
    onSuccess: () => setEditMode(false),
  });

  const isValid =
    hotelName.trim() === "" || hotelName.toLowerCase() === name.toLowerCase();

  return (
    <div className="flex items-center gap-x-2">
      {editMode ? (
        <input
          className="text-3xl capitalize font-bold px-2.5 py-1.5 rounded-lg"
          value={hotelName}
          onChange={({ target }) => setHotelName(target.value)}
        />
      ) : (
        <h2 className="text-3xl capitalize font-bold">{name}</h2>
      )}

      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="hover:bg-white p-2 rounded-full transition-colors group"
        >
          <PencilIcon className="text-xl text-gray-500 group-hover:text-black" />
        </button>
      ) : (
        <div className="flex items-center">
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Anuluj
          </Button>
          <Button
            disabled={isValid}
            onClick={() => updateName({ name: hotelName, id })}
          >
            Zapisz
          </Button>
        </div>
      )}
    </div>
  );
};
