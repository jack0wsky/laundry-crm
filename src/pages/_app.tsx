import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "@/frontend/react-query.client";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
