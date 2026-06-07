import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { AppLayout } from "../components/AppLayout";
import { AuthGate } from "../components/AuthGate";
import { AuthProvider } from "../components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
});

const googleAnalyticsId = "G-B9ZK59C59V";

export const metadata: Metadata = {
  title: "FinanceDash - Personal Budget",
  description: "A simple personal budget dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-zinc-100 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 antialiased min-h-screen">
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="beforeInteractive"
        />
        <Script id="google-analytics-config" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${googleAnalyticsId}');`}
        </Script>
        <AuthProvider>
          <AuthGate>
            <AppLayout>
              {children}
            </AppLayout>
          </AuthGate>
        </AuthProvider>
        <Script
          id="contentsquare-uxa"
          src="https://t.contentsquare.net/uxa/2ec012c90a131.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
