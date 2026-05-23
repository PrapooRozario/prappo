import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/Skeleton";
import { InitialLoader } from "@/components/ui";

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

function NavFallback() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none">
      <div className="w-full px-[20px] pt-[20px]">
        {/* Desktop */}
        <div className="relative w-full hidden md:grid md:grid-cols-3 border border-black/10 h-[56px]">
          <div className="border-r border-black/10 flex gap-2 items-center p-2">
            <Skeleton height="2.5rem" width="6rem" className="rounded-full" />
            <Skeleton height="2.5rem" width="6rem" className="rounded-full" />
            <Skeleton height="2.5rem" width="6rem" className="rounded-full" />
          </div>
          <div className="border-r border-black/10 flex items-center px-2">
            <Skeleton height="1.75rem" width="12rem" />
          </div>
          <div className="flex items-center px-2">
            <Skeleton height="1.75rem" width="14rem" />
          </div>
        </div>

        {/* Mobile */}
        <div className="relative w-full grid grid-cols-1 md:hidden border border-black/10 min-h-[52px]">
          <div className="flex gap-2 items-center p-2">
            <Skeleton height="2rem" width="5rem" className="rounded-full" />
            <Skeleton height="2rem" width="5rem" className="rounded-full" />
            <Skeleton height="2rem" width="5rem" className="rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function FooterFallback() {
  return <Skeleton width="100%" height="10rem" margin="2.5rem 0 0 0" />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-black" suppressHydrationWarning>
        <Suspense fallback={<NavFallback />}>
          <Nav />
        </Suspense>
        <InitialLoader />
        <main className="px-[20px] pb-[20px]">
          {children}
        </main>
        <Suspense fallback={<FooterFallback />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
