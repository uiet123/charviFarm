import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charvi Farm | Shudh Buffalo Ghee",
  description: "Charvi Farm Dairy - Shudh Buffalo Ghee, Ghar Tak. No powder, no mixing - 100% farm fresh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-brand-cream text-brand-dark font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
