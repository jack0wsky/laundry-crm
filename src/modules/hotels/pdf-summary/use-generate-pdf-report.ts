import { useMutation } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import axios from "axios";

export const useGeneratePdfReport = (hotelId: string, options?: {
  onSuccess: (downloadFileUrl: string) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: {
      hotelName: string;
      reports: any[];
      month: number;
      year: number;
    }) => {
      return axios.post(`/api/${hotelId}`, payload);
    },
    onSuccess: (_, variables) => {
      setTimeout(async () => {
        const data = await db.downloadPDF(
          variables.hotelName,
          variables.month,
          variables.year,
        );

        if (data) {
          options?.onSuccess(data.signedUrl);
        }
      }, 1000);
    },
  });

  return {
    generatePdfReport: mutate,
    isPending,
  };
};
