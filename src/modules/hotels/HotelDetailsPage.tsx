"use client";

import { Header } from "@/modules/shared/Header";
import { ReportProductsTable } from "@/modules/hotels/reports/ReportProductsTable";
import { useParams } from "next/navigation";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useState } from "react";

export const HotelDetailsPage = () => {
  const { hotels } = useListHotels();

  const params = useParams<{ hotelId: string }>();

  const activeHotel = hotels.find((hotel) => hotel.id === params?.hotelId);

  if (!activeHotel) return null;

  return (
    <div className="content-width ml-[300px] overflow-x-hidden min-h-screen">
      <div className="flex flex-col px-5">
        <Header activeHotel={activeHotel} />

        <ReportProductsTable key={activeHotel.id} activeHotel={activeHotel} />
      </div>
    </div>
  );
};
