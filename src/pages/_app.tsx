import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "@/modules/services/react-query.client";
import { QueryClientProvider } from "react-query";
import Head from "next/head";
import { Layout } from "@/modules/shared/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Head>
        <title>CRM | L&apos;aqua</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
