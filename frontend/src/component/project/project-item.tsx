import {Project} from "@/lib/types/Project";
import Link from "next/link";
import {ProjectOperation} from "@/component/project/project-operation";

interface ProjectItemProps {
    project: Project
}
export function ProjectItem({project}: ProjectItemProps) {
    return(
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-semibold hover:underline"
                >
                    {project.title}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Автор - {project.owner}

                    </p>
                    <p className="text-sm text-muted-foreground">
                        Статус проекта - {project.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {project.description}
                    </p>
                </div>
            </div>
            <ProjectOperation project={{ id: project.id, title: project.title }} />
        </div>
    )
}

