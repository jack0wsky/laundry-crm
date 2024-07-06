import { PropsWithChildren } from "react";

import { Metadata } from "next";
import { Navigation } from "@/modules/shared/Navigation";

export const metadata: Metadata = {
  title: "CRM | L'aqua",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="pl">
      <body>
        <Navigation />
        {/*<SideNavigation />*/}
        {children}
      </body>
    </html>
  );
}
