import {ProjectPreview} from "@/lib/types/type";
import Link from "next/link";

interface ProjectPreviewItemProps {
    project: ProjectPreview;
}

export function ProjectPreviewItem({project}: ProjectPreviewItemProps) {
    return (
        <div className='flex items-center justify-between p-4'>
            <div>
                <Link href={`/dashboard/project/${project.id}`}
                      className='font-semibold hover:underline'>
                    {project.title}
                </Link>
                <div>
                    <p className='text-sm text-muted-foreground'
                    >Количество задач: {project.taskCount}</p>
                </div>
            </div>
        </div>
    )
}