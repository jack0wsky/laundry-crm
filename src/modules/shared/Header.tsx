import type { Hotel } from "@/modules/hotels/types";
import { HotelName } from "@/modules/shared/HotelName";
import { ProductsDrawer } from "@/modules/hotels/pricing/ProductsDrawer";
import { AbstractBackground } from "@/modules/shared/AbstractBackground";
import { Button } from "@/modules/shared/Button";

interface HeaderProps {
  activeHotel: Hotel;
}
export const Header = ({ activeHotel }: HeaderProps) => {
  return (
    <header className="w-full flex flex-col relative">
      <AbstractBackground />
      <div className="w-full flex justify-between items-center p-5">
        <HotelName
          key={activeHotel.name}
          id={activeHotel.id}
          name={activeHotel.name}
        />

        <ProductsDrawer
          trigger={(openModal) => (
            <Button onClick={openModal} variant="secondary">
              Produkty
            </Button>
          )}
          hotelName={activeHotel.name}
        />
      </div>
    </header>
  );
};
