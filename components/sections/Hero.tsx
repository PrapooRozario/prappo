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
      <h1 className="font-mono font-medium flex justify-between items-center text-[13.5vw] whitespace-nowrap leading-none tracking-[-0.06em]">
        <span>{label}</span>
        <Image
          src="/icons/sparkle.svg"
          alt=""
          aria-hidden="true"
          width={120}
          height={120}
          priority
          className="w-[0.7em] h-[0.7em] mx-[0.1em] inline-block align-middle"
        />
        <span>{resolvedYear}</span>
      </h1>
    </header>
  );
}
