import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Prappo Rozario — Developer",
  description:
    "Prappo is a MERN stack developer focusing on creative digital products and full-stack experiences, located in Dhaka, Bangladesh.",
  metadataBase: new URL("https://prapporozario.vercel.app"),
  openGraph: {
    title: "Prappo Rozario — Developer",
    description:
      "Prappo is a MERN stack developer focusing on creative digital products and full-stack experiences, located in Dhaka, Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Nav />
        <main className="px-[20px] pb-[20px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
