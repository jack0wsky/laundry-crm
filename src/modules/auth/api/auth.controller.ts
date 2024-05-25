import { useMutation } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { hotelsQueryKey } from "@/modules/hotels/api/hotels.controller";

const sessionQueryKey = () => ["session"];

export const useCheckSession = () => {
  const { data } = useQuery({
    queryKey: sessionQueryKey(),
    queryFn: () => db.auth.checkSession(),
  });

  return {
    accessToken: data?.accessToken,
    expiration: data?.expiration,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => db.auth.logout(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sessionQueryKey() });
      void queryClient.invalidateQueries({ queryKey: hotelsQueryKey() });
    },
  });

  return {
    logout: mutate,
    isLoading: isPending,
    error,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      db.auth.login(payload.email, payload.password),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sessionQueryKey() });
      void queryClient.invalidateQueries({ queryKey: hotelsQueryKey() });
    },
  });

  return {
    login: mutate,
    isLoading: isPending,
    error,
  };
};
