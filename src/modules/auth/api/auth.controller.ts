import { useMutation } from "react-query";
import { db } from "@/modules/services/laundry.db";
import { useQueryClient, useQuery } from "react-query";

export const useCheckSession = () => {
  const { data } = useQuery("session", () => db.checkSession());

  return {
    accessToken: data?.accessToken,
    expiration: data?.expiration,
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(() => db.logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries("session");
      queryClient.invalidateQueries("hotels");
    },
  });

  return {
    logout: mutate,
    isLoading,
    error,
  };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    (payload: { email: string; password: string }) =>
      db.login(payload.email, payload.password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("session");
        queryClient.invalidateQueries("hotels");
      },
    },
  );

  return {
    login: mutate,
    isLoading,
    error,
  };
};
