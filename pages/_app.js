// pages/_app.js
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextIntlProvider } from "next-intl";

export default function App({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlProvider>
  );
}