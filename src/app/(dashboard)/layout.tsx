import { PropsWithChildren } from "react";

import { Providers } from "@/modules/shared/providers";
import { SideNavigation } from "@/modules/shared/SideNavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM | L'aqua",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="pl">
      <body>
        <SideNavigation />
        {children}
      </body>
    </html>
  );
}
