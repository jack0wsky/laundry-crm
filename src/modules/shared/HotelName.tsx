import { useEffect, useState } from "react";
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
    <div className="flex items-center gap-x-2 text-white">
      {editMode ? (
        <input
          className="text-3xl capitalize font-bold px-2.5 py-1.5 rounded-lg bg-white/10"
          value={hotelName}
          onChange={({ target }) => setHotelName(target.value)}
        />
      ) : (
        <h2 className="text-3xl font-bold">{name}</h2>
      )}

      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="hover:bg-white border border-white/10 p-2 rounded-full transition-colors group"
        >
          <PencilIcon className="text-xl text-white group-hover:text-black" />
        </button>
      ) : (
        <div className="flex items-center gap-x-2">
          <Button variant="outline" onClick={() => setEditMode(false)}>
            Anuluj
          </Button>
          <Button
            disabled={isValid}
            variant="secondary"
            onClick={() => updateName({ name: hotelName, id })}
          >
            Zapisz
          </Button>
        </div>
      )}
    </div>
  );
};
