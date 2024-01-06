import { PropsWithChildren } from "react";
import { LoginModal } from "@/modules/auth/LoginModal";
import { AuthProvider } from "@/modules/auth/Auth.context";
import { SideNavigation } from "@/modules/shared/SideNavigation";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthProvider>
      <LoginModal />
      <main className="w-full flex h-full relative">
        <SideNavigation />
        {children}
      </main>
    </AuthProvider>
  );
};
