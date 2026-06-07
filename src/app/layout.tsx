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

const googleTagManagerId = "GTM-W3WFL7TJ";

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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
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
