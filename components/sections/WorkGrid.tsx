import WorkCard from "./WorkCard";
import { projects } from "@/data/projects";

export default function WorkGrid() {
  return (
    <section
      aria-label="Featured projects"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 relative"
    >
      {projects.map((project) => (
        <WorkCard key={project.id} project={project} />
      ))}
    </section>
  );
}
