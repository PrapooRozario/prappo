"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaDribbble, FaBehance, FaTiktok, FaDiscord, FaMedium, FaReddit, FaPinterest, FaWhatsapp, FaTelegram, FaStackOverflow, FaGlobe } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

import { Corner, HoverSlideText } from "@/components/ui";
import { useFooterTheme } from "@/hooks/useFooterTheme";
import { linkPillVariants } from "@/lib/variants";
import type { SocialLink } from "@/lib/data/social-links";

const ICON_MAP: Record<string, IconType> = {
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  dribbble: FaDribbble,
  behance: FaBehance,
  tiktok: FaTiktok,
  discord: FaDiscord,
  medium: FaMedium,
  reddit: FaReddit,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  stackoverflow: FaStackOverflow,
  email: FiMail,
  mail: FiMail,
};

const extractUsername = (value: string) => {
  if (value.includes("facebook.com")) {
    return value.split("facebook.com/")[1];
  }
  if (value.includes("github.com")) {
    return value.split("github.com/")[1];
  }
  if (value.includes("linkedin.com")) {
    return value.split("linkedin.com/in/")[1];
  }

  return value;
}



interface NavLinkItem {
  label: string;
  href: string;
}

interface NavClientProps {
  navLinks: readonly NavLinkItem[];
  socialLinks: SocialLink[];
}

function SocialPill({ icon: Icon, value, href, surface }: { icon: IconType, value: string, href: string, surface: "light" | "dark" }) {
  const isDark = surface === "dark";
  const textColor = isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center h-[40px] sm:h-[48px] rounded-full ${textColor} transition-colors duration-300 bg-transparent overflow-hidden`}
    >
      <div className="flex items-center justify-center w-[40px] sm:w-[48px] h-full flex-shrink-0">
        <Icon size={24}/>
      </div>
      
      {/* Expanding Text Container */}
      <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="overflow-hidden flex items-center">
          <span className="font-mono text-[12px] sm:text-[14px] tracking-wider whitespace-nowrap pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {"@" + extractUsername(href)}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function NavClient({ navLinks, socialLinks }: NavClientProps) {
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

  const renderSocials = () =>
    socialLinks
      .sort((a, b) => a.order_index - b.order_index)
      .map((link) => {
        const icon = ICON_MAP[link.label.toLowerCase()] ?? FaGlobe;
        return (
          <SocialPill
            key={link.id}
            icon={icon}
            value={link.label}
            href={link.href}
            surface={surface}
          />
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

          {/* Column 3: Socials */}
          <div className="flex items-center px-4 gap-3 whitespace-nowrap">
            {renderSocials()}
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
          <div className="flex justify-between items-center p-2 transition-colors duration-300">
            <div className="flex gap-2 items-center overflow-x-auto scrollbar-none whitespace-nowrap">
              {renderLinks("md")}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
