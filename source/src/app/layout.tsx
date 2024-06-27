import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import FcmTokenComp from "./firebaseForeground";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/assets/scss/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProviderAuth from "./providers/Provider";
import { ReactNode } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryProvider } from "./providers/QueryProvider";
import Logo from "../assets/images/logo.png";
import ToastProvider from "./providers/toaster-provider";
// import StoreProvider from "./StoreProvider";
import { GlobalContextProvider } from "./Context/store";
import NextTopLoader from "nextjs-toploader";

export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "DatXE trang đặt lịch sửa chữa ô tô trực tuyến",
  description:
    "Đặt lịch sửa chữa ô tô tại 63 tỉnh thành, đặt lịch rửa xe, đặt lịch bảo dưỡng định kỳ, Garage ô tô uy tín, garage ô tô gần đây, trung tâm chăm sóc xe ô tô uy tín, cung cấp phụ tùng và dịch vụ ô tô, giải pháp quản lý garage ô tô hiệu quả, đặt lịch sửa xe giá rẻ,...",
  openGraph: {
    images: Logo.src,
  },
};

const theme = createTheme({
  // colorScheme: 'light',
  colors: {
    "ocean-blue": [
      "#FFF4E6",
      "#FFE8CC",
      "#FFD8A8",
      "#FFC078",
      "#FFA94D",
      "#FF922B",
      "#FD7E14",
      "#F76707",
      "#E8590C",
      "#D9480F",
    ],
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    xxl: "1532px",
  },

  fontFamily: "SFCompact, sans-serif",
  primaryColor: "ocean-blue",
  /** Put your mantine theme override here */
});

interface IProps {
  children: ReactNode;
  singlePage: boolean;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="var(--theme-color)" />
        <GlobalContextProvider>
          <QueryProvider>
            <MantineProvider theme={theme}>
              <ModalsProvider>
                <ProviderAuth>
                  {/* <StoreProvider> */}
                  <ToastProvider />
                  <FcmTokenComp />
                  {children}
                  {/* </StoreProvider> */}
                </ProviderAuth>
              </ModalsProvider>
            </MantineProvider>
          </QueryProvider>
        </GlobalContextProvider>
      </body>
      <GoogleAnalytics gaId="G-FXK6HYZ7YC" />
    </html>
  );
}
