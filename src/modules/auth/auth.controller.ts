import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { login } from "@/modules/auth/login.action";
import { logout } from "@/modules/auth/log-out.action";
import { da } from "date-fns/locale";

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

export const useLogin = (options?: {
  onSuccess: (laundryId: string) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload.email, payload.password),
    onSuccess: async (data) => {
      const laundryId = await db.auth.getLaundryId(data.userId as string);
      options?.onSuccess(laundryId as string);
    },
  });

  return {
    login: mutate,
    isPending,
  };
};

export const useLogout = (options?: { onSuccess: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      options?.onSuccess();
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
