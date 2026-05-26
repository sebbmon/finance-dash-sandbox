import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from "../components/AppLayout";
import { AuthGate } from "../components/AuthGate";
import { AuthProvider } from "../components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <AuthProvider>
          <AuthGate>
            <AppLayout>
              {children}
            </AppLayout>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
