import "./globals.css";
import type { Metadata } from "next";
import { lato } from "./fonts";
import Providers from "./providers";

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
