import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  const { systemTheme } = useTheme();

  return (
    <UserProvider>
      <ThemeProvider enableSystem={true} defaultTheme={systemTheme}>
        <NextIntlProvider  messages={pageProps.locales}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
