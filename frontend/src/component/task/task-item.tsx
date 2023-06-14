"use client"
import {Priority, ProjectStatus, Task, TaskStatus} from "@/lib/types/type";
import Link from "next/link";
import {TaskOperation} from "@/component/task/task-operation";
import {useEffect, useState} from "react";
import {Priorities, ProjectStatuses, TaskStatuses} from "@/component/data";
import {format, parseISO} from "date-fns";


interface TaskItemProps {
    task: Task
}
export function TaskItem({task}: TaskItemProps) {
    const [status, setStatus] = useState<TaskStatus>();
    const [priority, setPriority] = useState<Priority>();

    useEffect(() => {
        const taskStatus = TaskStatuses.find(pr => pr.value == task.status) || '';
        const taskPriority = Priorities.find(prio => prio.value == task.priority) || '';
        if(typeof taskStatus !== "string" && typeof taskPriority !== "string") {
            setPriority(taskPriority);
            setStatus(taskStatus);
        }

    }, [task.status, task.priority])
    const dateStr = new Date(task.expiration_date!);
    return(
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/task/${task.id}`}
                    className="font-semibold hover:underline"
                >
                    {task.title}
                </Link>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Статус - {status?.label}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Приоритет - {priority?.label}
                    </p>
                </div>
                <hr/>
                {task.expiration_date && (
                    <div>
                        <p className="text-sm text-muted-foreground">
                           Срок выполнения - {dateStr.toLocaleDateString()}
                        </p>
                    </div>
                )}

            </div>
            <TaskOperation task={{id: task.id, title: task.title}} />
        </div>
    )
}