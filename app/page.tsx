import Hero from "@/components/sections/Hero";
import WorkGrid from "@/components/sections/WorkGrid";
import TechStack from "@/components/sections/TechStack";

export default function Home() {
  return (
    <div className="pt-[120px] md:pt-[140px]">
      <Hero label="WORK" />
      <WorkGrid />
      <TechStack />
    </div>
  );
}
