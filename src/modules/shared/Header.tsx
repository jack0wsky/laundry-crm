import { useState, useRef, useEffect } from "react";
import { PricingModal } from "@/modules/hotels/pricing/PricingModal";
import { Button } from "@/modules/shared/Button";
import type { Hotel } from "@/modules/hotels/types";
import { HotelName } from "@/modules/shared/HotelName";
import { ProductsDrawer } from "@/modules/hotels/pricing/ProductsDrawer";

interface HeaderProps {
  activeHotel: Hotel;
}
export const Header = ({ activeHotel }: HeaderProps) => {
  const [openPricingModal, setPricingModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!downloadLinkRef.current || !downloadUrl) return;

    downloadLinkRef.current.click();
  }, [downloadUrl, downloadLinkRef.current]);

  return (
    <header className="w-full flex flex-col">
      {openPricingModal && (
        <PricingModal
          hotelName={activeHotel.name}
          isVisible={openPricingModal}
          onClose={() => setPricingModal(false)}
        />
      )}
      <div className="w-full flex justify-between items-center py-5">
        <HotelName
          key={activeHotel.name}
          id={activeHotel.id}
          name={activeHotel.name}
        />

        <div className="flex items-center gap-x-6">
          <a
            className="hidden"
            href={downloadUrl || ""}
            download="File.pdf"
            target="_blank"
            ref={downloadLinkRef}
          ></a>

          <ProductsDrawer hotelName={activeHotel.name} />

          {/*<Button*/}
          {/*  variant="secondary"*/}
          {/*  onClick={generatePDF}*/}
          {/*  className={isPending ? "animate-pulse" : ""}*/}
          {/*  disabled={isPending}*/}
          {/*  prefix={<PDFFileIcon className="text-xl" />}*/}
          {/*>*/}
          {/*  {isPending ? "Generowanie..." : "Generuj zestawienie"}*/}
          {/*</Button>*/}
        </div>
      </div>
    </header>
  );
};
