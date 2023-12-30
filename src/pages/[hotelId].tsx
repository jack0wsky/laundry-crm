import { useState } from "react";
import { useListHotels } from "@/frontend/api/laundry/hotels.controller";
import { useRouter } from "next/router";
import { Header } from "@/frontend/components/Header";
import { ReportProductsTable } from "@/frontend/components/ReportProductsTable";
import { useActiveMonth } from "@/frontend/components/use-active-month";

export default function Hotel() {
  const router = useRouter();
  const { hotels } = useListHotels();

  const [openModal, setOpenModal] = useState(false);

  const { previousMonth, nextMonth, activeDate } = useActiveMonth();
  const closeModal = () => setOpenModal(false);

  const hotelId = router.query.hotelId as string;

  const activeHotel = hotels.find((hotel) => hotel.id === hotelId);

  if (!activeHotel) return null;

  return (
    <div className="ml-[300px] min-w-3/4 overflow-x-hidden w-full min-h-screen">
      <Header
        activeHotel={activeHotel}
        activeDate={activeDate}
        onPreviousArrowClick={previousMonth}
        onNextArrowClick={nextMonth}
        onGenerateInvoiceClick={() => setOpenModal(true)}
      />

      <ReportProductsTable
        key={activeHotel.id}
        activeHotel={activeHotel}
        activeYear={activeDate.year}
        activeMonth={activeDate.month}
        openModal={openModal}
        onCloseModalClick={closeModal}
      />
    </div>
  );
}
