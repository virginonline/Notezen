import {Project} from "@/lib/types/Project";
import {Task} from "@/lib/types/Task";
import Link from "next/link";
import {ProjectOperation} from "@/component/project/project-operation";
import {TaskOperation} from "@/component/task/task-operation";


interface TaskItemProps {
    task: Task
}
export function TaskItem({task}: TaskItemProps) {
    return(
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/projects/${task.id}`}
                    className="font-semibold hover:underline"
                >
                    {task.title}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {task.description}
                    </p>
                </div>
            </div>
            <TaskOperation task={{id: task.id, title: task.title}} />
        </div>
    )
}