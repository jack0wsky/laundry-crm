import { PropsWithChildren } from "react";

import "@/styles/globals.css";
import { LoginModal } from "@/modules/auth/LoginModal";
import { Providers } from "@/modules/shared/providers";
import { SideNavigation } from "@/modules/shared/SideNavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM | L'aqua",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pl">
      <body>
        <Providers>
          <LoginModal />
          <SideNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
