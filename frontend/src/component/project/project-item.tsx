'use client'
import {Project, ProjectStatus} from "@/lib/types/type";
import Link from "next/link";
import {ProjectOperation} from "@/component/project/project-operation";
import {ProjectStatuses} from "@/component/data";
import {useEffect, useState} from "react";

interface ProjectItemProps {
    project: Project
}
export function ProjectItem({project}: ProjectItemProps) {
    const [status, setStatus] = useState<ProjectStatus>();
    useEffect(() => {
        const value = ProjectStatuses.find(pr => pr.value == project.status) || '';
        if(typeof value !== "string") {
            setStatus(value);
        }
        console.log(`value is ${status}`)
    }, [project.status, status])

    return(
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-heading font-semibold hover:underline"
                >
                    {project.title}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Автор - {project.owner}

                    </p>
                    <p className="text-sm text-muted-foreground">
                        Статус проекта - {status?.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {project.description}
                    </p>
                </div>
            </div>
            <ProjectOperation project={{ id: project.id, title: project.title, status: project.status, description: project.description, owner: project.owner }} />
        </div>
    )
}

