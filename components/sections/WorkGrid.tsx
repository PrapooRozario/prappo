import WorkCard from "./WorkCard";
import { getProjects } from "@/lib/data/projects";

export default async function WorkGrid() {
  const projects = await getProjects();

  return (
    <section
      aria-label="Featured projects"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 relative"
    >
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
    </section>
  );
}
