import { useQuery } from "react-query";
import { db } from "@/modules/services/laundry.db";
import type { Hotel } from "@/modules/hotels/types";

export const useListHotels = () => {
  const { data } = useQuery<Hotel[], Error>("hotels", () => db.getHotels());

  return {
    hotels: data || [],
  };
};
