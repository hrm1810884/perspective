import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"

//const inter = Inter({ subsets: ["latin"] });
const ZenOldMincho = Zen_Old_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mincho",
});

export const metadata: Metadata = {
  title: "Prespective",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        ZenOldMincho.variable
      )}>{children}</body>  
    </html>
  );
}
