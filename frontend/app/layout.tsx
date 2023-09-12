import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Providers from "./providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});
export const metadata: Metadata = {
  title: "Notes",
  description: "A simple React notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
