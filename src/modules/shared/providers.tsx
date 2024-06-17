"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/modules/auth/Auth.context";

export const Providers = ({ children }: PropsWithChildren) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
