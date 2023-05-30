import {Project} from "@/lib/types/Project";
import {ProjectItem} from "@/component/project/project-item";

interface ProjectItemListProps {
    projects: Project[];
}
export function ProjectItemList({projects}: ProjectItemListProps) {
    return(
        <div
            className="
            divide-y
            divide-border
            rounded-md
            border
            "
        >
            {projects.map((project) => (
                <ProjectItem key={project.id} project={project}/>
            ))}
        </div>
    )
}