import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { login } from "@/modules/auth/login.action";
import { useRouter } from "next/navigation";
import { logout } from "@/modules/auth/log-out.action";

const sessionQueryKey = () => ["session"];

export const useLaundryId = () => {
  const { user } = useCheckSession();
  const { data } = useQuery({
    queryKey: ["laundryId", user?.id],
    queryFn: () => db.auth.getLaundryId(user?.id),
    enabled: !!user?.id,
  });

  return data?.id;
};

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

export const useLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload.email, payload.password),
    onSuccess: () => {
      router.push("/");
    },
  });

  return {
    login: mutate,
    isPending,
  };
};

export const useLogout = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
