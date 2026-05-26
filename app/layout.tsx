import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prappo Rozario — Developer",
  description:
    "Prappo is a MERN stack developer focusing on creative digital products and full-stack experiences, located in Dhaka, Bangladesh.",
  metadataBase: new URL("https://prapporozario.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
