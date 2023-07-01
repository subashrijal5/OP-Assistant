import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider, useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from 'next-i18next';

const queryClient = new QueryClient();

const  MyApp = ({ Component, pageProps }: AppProps) => {
    const { systemTheme } = useTheme();

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ThemeProvider enableSystem={true} defaultTheme={systemTheme}>
                        <Component {...pageProps} />
                </ThemeProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}

export default appWithTranslation(MyApp);