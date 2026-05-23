import Image from "next/image";

interface HeroProps {
  label?: string;
  year?: string;
}

async function getDisplayYear(): Promise<string> {
  "use cache";
  return `${new Date().getFullYear()}`;
}

export default async function Hero({ label = "WORK", year }: HeroProps) {
  const resolvedYear = year ?? (await getDisplayYear());
  return (
    <header className="w-full">
      <h1 className="font-mono font-medium flex justify-between items-center text-[72px] md:text-[224px] whitespace-nowrap leading-none tracking-[-0.06em]">
        <span>{label}</span>
        <Image
          src="/icons/sparkle.svg"
          alt=""
          aria-hidden="true"
          width={120}
          height={120}
          priority
          className="mx-2 md:mx-4 w-[40px] md:w-[140px] h-[40px] md:h-[140px] inline-block align-middle"
        />
        <span>{resolvedYear}</span>
      </h1>
    </header>
  );
}
