import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Inter, Public_Sans } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
  subsets: ["latin"]
});

const publicSans = Public_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--font-public-sans",
  subsets: ["latin"]
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <div className={`${publicSans.variable} ${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp /*, nextI18NextConfig */);
