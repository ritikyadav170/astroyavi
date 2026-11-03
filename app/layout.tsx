import "./globals.css";
import { cn } from "@lib/utils";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import QueryProvider from "@providers/QueryProvider";
import ToastProvider from "@providers/ToastProvider";
import { AuthProvider } from "@providers/AuthProvider";
import { Poppins as FontSans, Cormorant_Garamond as FontSerif } from "next/font/google";
import { unstable_noStore as noStore } from "next/cache";
import { APP_DESCRIPTION, APP_NAME, PRIMARY_COLOR } from "@data";

const fontSans = FontSans({
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-512x512.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
  },
};

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  noStore();
  const nonce = (await headers()).get("x-nonce") || "";

  return (
    <html lang="en">
      <head>
        <meta content={PRIMARY_COLOR} name="theme-color" nonce={nonce} />
      </head>
      <body className={cn("relative font-sans antialiased bg-[#fdf8f0] text-slate-900 min-h-screen", fontSans.variable, fontSerif.variable)}>
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
