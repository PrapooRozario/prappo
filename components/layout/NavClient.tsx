"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Corner, HoverSlideText } from "@/components/ui";
import { useFooterTheme } from "@/hooks/useFooterTheme";
import { linkPillVariants } from "@/lib/variants";

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavClientProps {
  navLinks: readonly NavLinkItem[];
  contactEmail?: string;
}

export default function NavClient({ navLinks, contactEmail = "hi@prappo.com" }: NavClientProps) {
  const pathname = usePathname();
  const isOverFooter = useFooterTheme();
  const surface = isOverFooter ? "dark" : "light";
  const themeText = surface === "dark" ? "text-white" : "text-black";
  const themeBorder = surface === "dark" ? "border-white/20" : "border-black/20";
  const navLinkText = "block text-black group-hover:text-white transition-colors duration-300";
  const navLinkHiddenText = "text-white";

  const renderLinks = (size: "md" | "lg") => navLinks.map(({ label, href }) => {
    const isActive = pathname === href;
    const currentNavLinkText = isActive
      ? "block text-white transition-colors duration-300"
      : "block text-black group-hover:text-white transition-colors duration-300";

    return (
      <Link
        key={href}
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={linkPillVariants({ size, intent: isActive ? "active" : "inactive" }) + " group"}
      >
        <HoverSlideText
          label={label}
          textClassName={currentNavLinkText}
          hiddenClassName={navLinkHiddenText}
        />
      </Link>
    );
  });

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-50 bg-transparent"
    >
      <div className="w-full px-[20px] pt-[20px]">
        {/* Desktop */}
        <div
          className={`relative w-full hidden lg:grid lg:grid-cols-3 border ${themeBorder} font-sans bg-transparent text-[20px] xl:text-[28px] transition-colors duration-300 h-[56px]`}
        >
          {/* 4 Outer Corners */}
          <Corner className={`-top-[1.5px] -left-[1.5px] ${themeText}`} />
          <Corner className={`-top-[1.5px] -right-[1.5px] ${themeText}`} />
          <Corner className={`-bottom-[1.5px] -left-[1.5px] ${themeText}`} />
          <Corner className={`-bottom-[1.5px] -right-[1.5px] ${themeText}`} />

          {/* Column 1/2 divider intersections */}
          <Corner className={`-top-[1.5px] left-[calc(33.333%-1.5px)] ${themeText}`} />
          <Corner className={`-bottom-[1.5px] left-[calc(33.333%-1.5px)] ${themeText}`} />

          {/* Column 2/3 divider intersections */}
          <Corner className={`-top-[1.5px] left-[calc(66.666%-1.5px)] ${themeText}`} />
          <Corner className={`-bottom-[1.5px] left-[calc(66.666%-1.5px)] ${themeText}`} />

          {/* Column 1: Links */}
          <div className={`border-r flex gap-2 items-center p-2 transition-colors duration-300 ${themeBorder}`}>
            {renderLinks("lg")}
          </div>

          {/* Column 2: Name */}
          <div className={`border-r flex items-center px-2 ${themeBorder} overflow-hidden whitespace-nowrap`}>
            <span className={`block text-[20px] xl:text-[28px] truncate ${themeText}`}>
              Prappo Rozario
            </span>
          </div>

          {/* Column 3: Email */}
          <div className={`flex items-center px-2 ${themeText} overflow-hidden whitespace-nowrap`}>
            <a
              href={`mailto:${contactEmail}`}
              className="block text-[20px] xl:text-[28px] hover:underline truncate"
            >
              {contactEmail}
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div
          className={`relative w-full grid grid-cols-1 lg:hidden border font-sans bg-transparent text-[22px] transition-colors duration-300 ${themeBorder} ${themeText}`}
        >
          {/* 4 Outer Corners */}
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          {/* Links row */}
          <div className="flex gap-2 items-center p-2 transition-colors duration-300 overflow-x-auto scrollbar-none whitespace-nowrap">
            {renderLinks("md")}
          </div>
        </div>
      </div>
    </nav>
  );
}
