import WorkCard from "./WorkCard";
import { getProjects } from "@/lib/data/projects";
import Link from "next/link";

export default async function WorkGrid() {
  const projects = await getProjects();

  return (
    <section aria-label="Featured projects" className="relative mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <WorkCard
            key={project.id}
            project={{
              id: project.slug,
              title: project.title,
              year: project.year,
              category: project.category,
              number: project.number,
              image: project.image,
            }}
          />
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <Link
          href="/work"
          className="group inline-flex items-center justify-center gap-3 rounded-full border border-black/20 bg-transparent px-8 py-4 font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-black transition-colors hover:border-black/60"
        >
          More projects
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
