"use client";

import { Header } from "@/modules/shared/Header";
import { ReportProductsTable } from "@/modules/hotels/reports/ReportProductsTable";
import { useParams, useRouter } from "next/navigation";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useState } from "react";
import { useActiveMonth } from "@/modules/utils/useActiveMonth";
import { useCheckSession } from "@/modules/auth/auth.controller";

export const HotelDetailsPage = () => {
  const { hotels } = useListHotels();
  const router = useRouter();
  const { user } = useCheckSession();

  const [openModal, setOpenModal] = useState(false);

  const { previousMonth, nextMonth, activeDate } = useActiveMonth();
  const closeModal = () => setOpenModal(false);

  const params = useParams<{ hotelId: string }>();

  const activeHotel = hotels.find((hotel) => hotel.id === params?.hotelId);

  if (!user) {
    return router.push("/login");
  }

  if (!activeHotel) return null;

  return (
    <div className="content-width ml-[300px] overflow-x-hidden min-h-screen">
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
};
