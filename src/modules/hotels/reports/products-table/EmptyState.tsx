import { ProductsDrawer } from "@/modules/hotels/pricing/ProductsDrawer";
import { Button } from "@/modules/shared/Button";

interface EmptyStateProps {
  hotelName: string;
}

export const EmptyState = ({ hotelName }: EmptyStateProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center text-center gap-y-3">
        <h2 className="text-xl font-bold">Brak produktów</h2>
        <p className="max-w-[300px] text-palette-gray-600">
          Dodaj produkty oraz ich ceny, aby móc w pełni korzystać z aplikacji
        </p>

        <ProductsDrawer
          hotelName={hotelName}
          trigger={(openModal) => (
            <Button onClick={openModal}>Dodaj produkt</Button>
          )}
        />
      </div>
    </div>
  );
};
