"use client";

import { Header } from "@/modules/shared/Header";
import { ReportProductsTable } from "@/modules/hotels/reports/ReportProductsTable";
import { useHotelDetails } from "@/modules/hotels/api/hotels.controller";

interface HotelDetailsPageProps {
  hotelId: string;
}

export const HotelDetailsPage = ({ hotelId }: HotelDetailsPageProps) => {
  const { hotel, loading } = useHotelDetails(hotelId);

  if (loading) return <Skeleton />;

  if (!hotel) return null;

  return (
    <div className="content-width ml-[300px] overflow-x-hidden min-h-screen flex flex-col">
      <Header activeHotel={hotel} />

      <ReportProductsTable key={hotelId} activeHotel={hotel} />
    </div>
  );
};

function Skeleton() {
  return (
    <div className="content-width ml-[300px] flex flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="h-9 w-[200px] bg-palette-gray-200 rounded-md animate-pulse" />

        <div className="w-[120px] h-[50px] rounded-full bg-white" />
      </div>

      <div className="mt-5 w-full h-screen bg-white rounded-[20px] p-5">
        <div className="flex items-center justify-between">
          <div className="w-[160px] h-9 rounded-full bg-palette-gray-100 animate-pulse" />

          <div className="w-[163px] h-12 rounded-full bg-palette-blue-600 animate-pulse" />
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center w-full">
              <div className="h-6 w-[100px] bg-palette-gray-100 rounded-md animate-pulse mr-24" />

              <div className="w-full flex items-center gap-x-2">
                {Array.from({ length: 11 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[72px] h-[42px] rounded-md bg-palette-gray-100"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
