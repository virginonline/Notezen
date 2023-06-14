"use client"
import {Priority, Task, TaskStatus} from "@/lib/types/type";
import Link from "next/link";
import {TaskOperation} from "@/component/task/task-operation";
import {useEffect, useState} from "react";
import {Priorities, TaskStatuses} from "@/component/data";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/component/ui/card";


interface TaskItemProps {
    task: Task
}

export function TaskItem({task}: TaskItemProps) {
    const [status, setStatus] = useState<TaskStatus>();
    const [priority, setPriority] = useState<Priority>();

    useEffect(() => {
        const taskStatus = TaskStatuses.find(pr => pr.value == task.status) || '';
        const taskPriority = Priorities.find(prio => prio.value == task.priority) || '';
        if (typeof taskStatus !== "string" && typeof taskPriority !== "string") {
            setPriority(taskPriority);
            setStatus(taskStatus);
        }

    }, [task.status, task.priority])
    const dateStr = new Date(task.expiration_date!);
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <Link href={`/dashboard/task/${task.id}`} className="text-xl hover:underline">
                    <h3>{task.title}</h3>
                </Link>
                <CardDescription>
                    <TaskOperation taskId={task.id!}/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <p>
                        Автор - {task.created_by}
                    </p>
                </div>
                <div className='space-y-4 text-muted-foreground'>
                    <p>
                        Статус - {status?.label}
                    </p>

                    <p>
                        Приоритет - {priority?.label}
                    </p>
                </div>
                {task.assigned_to && (
                    <p>
                        Ответственный пользователь - {task.assigned_to}
                    </p>
                )}
            </CardContent>
            <CardFooter>
                {task.expiration_date && (
                    <p>
                        Срок выполнения - {dateStr.toLocaleDateString()}
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}