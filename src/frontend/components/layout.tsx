import { PropsWithChildren } from "react";
import { Login } from "@/frontend/components/Login";
import { AuthProvider } from "@/frontend/Auth.context";
import { Clients } from "@/frontend/components/clients";
import { useRouter } from "next/router";
import { useListHotels } from "@/frontend/api/laundry/hotels.controller";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const router = useRouter();
  const { hotels } = useListHotels();

  // console.log("hotels", hotels);

  const activeUrl = (router.query.hotelId || router.route) as string;

  return (
    <AuthProvider>
      <Login />
      <main className="w-full flex h-full relative">
        <Clients hotels={hotels} activeUrl={activeUrl} />
        {children}
      </main>
    </AuthProvider>
  );
};
