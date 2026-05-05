import type { Metadata } from "next";
import { Josefin_Slab, Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: "--font-josefin-slab",
  weight: ["400", "600", "700"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "Un viaje por nuestro universo 🌌",
  description: "Un regalo especial para Daniela",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${josefinSlab.variable} ${josefinSans.variable}`}
    >
      <body className="min-h-screen bg-space text-snow antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
