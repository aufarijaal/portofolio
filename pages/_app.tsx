import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { GeistSans } from "geist/font/sans";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <div className={`${GeistSans.className}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
