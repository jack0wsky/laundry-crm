import { LeftArrowIcon } from "@/frontend/components/left-arrow.icon";
import { RightArrowIcon } from "@/frontend/components/right-arrow.icon";
import { useState } from "react";
import { PricingModal } from "@/frontend/components/PricingModal";
import { Button } from "@/frontend/components/shared/Button";
import { months } from "@/shared/constants";

interface HeaderProps {
  activeDate: {
    month: number;
    year: number;
  };
  hotelName: string;
  onPreviousArrowClick: () => void;
  onNextArrowClick: () => void;
  onGenerateInvoiceClick: () => void;
}
export const Header = ({
  hotelName,
  activeDate,
  onPreviousArrowClick,
  onNextArrowClick,
  onGenerateInvoiceClick,
}: HeaderProps) => {
  const [openPricingModal, setPricingModal] = useState(false);

  return (
    <header className="w-full flex flex-col px-4">
      {openPricingModal && (
        <PricingModal
          hotelName={hotelName}
          isVisible={openPricingModal}
          onClose={() => setPricingModal(false)}
        />
      )}
      <div className="w-full flex justify-between items-center py-5">
        <h2 className="text-2xl capitalize font-bold">{hotelName}</h2>

        <div className="flex items-center gap-x-6">
          <Button
            // disabled
            variant="secondary"
            onClick={() => setPricingModal(true)}
          >
            Cennik
          </Button>
          <Button onClick={onGenerateInvoiceClick}>Generuj fakturę</Button>
        </div>
      </div>

      <div className="flex h-[80px] justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-3 mb-4">
            <button
              onClick={onPreviousArrowClick}
              className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
            >
              <LeftArrowIcon />
            </button>
            <h2 className="text-2xl">
              {months[activeDate.month]} {activeDate.year}
            </h2>
            <button
              className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
              onClick={onNextArrowClick}
            >
              <RightArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
