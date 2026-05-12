import Link from "next/link";
import { Corner } from "@/components/ui";
import { navLinks } from "@/data/nav-links";
import { socialLinks } from "@/data/social-links";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-16 md:mt-24">
      <div className="w-full px-[20px] py-[20px]">
        <div className="relative w-full border border-white/20 font-sans">
          {/* Outer corners */}
          <Corner className="-top-[1.5px] -left-[1.5px]" />
          <Corner className="-top-[1.5px] -right-[1.5px]" />
          <Corner className="-bottom-[1.5px] -left-[1.5px]" />
          <Corner className="-bottom-[1.5px] -right-[1.5px]" />

          {/* Hero CTA */}
          <div className="px-[20px] pt-[40px] md:pt-[64px] pb-[300px] max-w-5xl leading-[1.05]">
            <p className="text-[28px] md:text-[44px] lg:text-[56px]">
              Wanna work together?
              <br />
              Let’s get in touch and chat.
              <br />
              <div className="opacity-80">


              Or reach out directly to{" "}
              <a
                href="mailto:albart2022@gmail.com"
                className="hover:!underline hover:!decoration-white decoration-1 underline-offset-2"
              >
                hi@prappo.com
              </a>
              </div>
            </p>
          </div>

          {/* Bottom grid */}
          <div className="relative border-t border-white/20 w-full">
            {/* Divider intersection dots at the top & bottom borders */}
            <Corner className="-top-[1.5px] -left-[1.5px]" />
            <Corner className="-top-[1.5px] -right-[1.5px]" />
            <Corner className="-top-[1.5px] left-[calc(33.333%-1.5px)] hidden md:block" />
            <Corner className="-top-[1.5px] left-[calc(66.666%-1.5px)] hidden md:block" />
            <Corner className="-bottom-[1.5px] left-[calc(33.333%-1.5px)] hidden md:block" />
            <Corner className="-bottom-[1.5px] left-[calc(66.666%-1.5px)] hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
              {/* /CONTENT */}
              <div className="px-[20px] py-[16px]">
                <div className="font-mono uppercase text-[12px] tracking-[0.14em] text-white/70 mb-3">/ Content</div>
                <ul className="space-y-1 text-[20px]" aria-label="Site links">
                  {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="hover:!underline hover:!decoration-white underline-offset-2">{label}</Link>
                    </li>
                  ))}
                  <li><Link href="#" className="hover:!underline hover:!decoration-white underline-offset-2">Privacy</Link></li>
                  <li><Link href="#" className="hover:!underline hover:!decoration-white underline-offset-2">Legal notice</Link></li>
                </ul>
              </div>

              {/* /SOCIAL */}
              <div className="px-[20px] py-[16px]">
                <div className="font-mono uppercase text-[12px] tracking-[0.14em] text-white/70 mb-3">/ Social</div>
                <ul className="space-y-1 text-[20px]" aria-label="Social links">
                  {socialLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="hover:!underline hover:!decoration-white underline-offset-2">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* /ABOUT */}
              <div className="px-[20px] py-[16px]">
                <div className="font-mono uppercase text-[12px] tracking-[0.14em] text-white/70 mb-3">/ About</div>
                <p className="text-[20px] leading-[1.25] text-white/85">
                  Prappo is a MERN stack developer focusing on creative digital products and full-stack experiences, located in Dhaka, Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
