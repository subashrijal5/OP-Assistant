import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    const { systemTheme } = useTheme();
    
    

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ThemeProvider enableSystem={true} defaultTheme={systemTheme}>
                    <NextIntlProvider messages={pageProps.locales}>
                        <Component {...pageProps} />
                    </NextIntlProvider>
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
