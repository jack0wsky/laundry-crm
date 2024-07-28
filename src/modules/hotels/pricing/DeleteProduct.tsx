import { Pricing } from "@/modules/hotels/pricing/types";
import { TrashIcon } from "@/modules/shared/icons/trash.icon";
import { Button } from "@/modules/shared/Button";

interface DeleteProductProps {
  pricing: Pricing;
  onGoBack: () => void;
  onDeleteConfirm: () => void;
}

export const DeleteProduct = ({
  pricing,
  onDeleteConfirm,
  onGoBack,
}: DeleteProductProps) => {
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex items-center gap-x-3">
        <div className="w-10 h-10 bg-palette-red-100 rounded-xl flex justify-center items-center">
          <TrashIcon className="text-2xl text-palette-red-500" />
        </div>
        <p className="font-bold text-base">Usunąć &quot;{pricing.product.name}&quot;?</p>
      </div>

      <p className="text-palette-gray-600 font-medium text-center mt-4">
        Produkt zniknie z podsumowań oraz faktury, ale historyczne dane
        pozostaną w bazie danych
      </p>

      <div className="flex items-center w-full gap-x-3 mt-5">
        <Button variant="secondary" onClick={onGoBack} className="w-full">
          Nie, wróć
        </Button>
        <Button
          variant="destructive"
          onClick={onDeleteConfirm}
          className="w-full"
        >
          Tak, usuń
        </Button>
      </div>
    </div>
  );
};
