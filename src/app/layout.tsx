import "@/styles/globals.css";
import { Providers } from "@/modules/shared/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
