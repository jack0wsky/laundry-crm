'use client'

import { useParams } from "next/navigation";

export const useLaundryId = () => {
  const params = useParams<{ laundryId: string }>();

  return params?.laundryId as string;
};
