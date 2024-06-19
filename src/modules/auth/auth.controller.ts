import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";

const sessionQueryKey = () => ["session"];

export const useCheckSession = () => {
  const { data } = useQuery({
    queryKey: sessionQueryKey(),
    queryFn: () => db.auth.checkSession(),
  });

  return {
    accessToken: data?.session?.access_token,
    expiration: data?.session?.expires_at,
    user: data?.session?.user,
  };
};
