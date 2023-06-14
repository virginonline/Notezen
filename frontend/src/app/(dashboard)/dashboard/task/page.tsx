import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {TaskCreateButton} from "@/component/task/task-create-button";
import React from "react";
import {Task} from "@/lib/types/type";
import {TaskItem} from "@/component/task/task-item";
import {getTasksOfUser} from "@/lib/api/task";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const metadata: Metadata = {
    title: 'Проекты'
}
async function getTask() : Promise<Task[]> {
    return await getTasksOfUser();
}

export default async function TasksPage() {
    if(!cookies().has('_user')) {
        redirect('/login');
    }
    const tasks: Task[] = await getTask();
    return (
        <DashboardShell>
            <DashboardHeader heading={"Задачи"} text={"Здесь храняться ваши задачи"}>
                <TaskCreateButton/>
            </DashboardHeader>
            <div
                className="
        divide-y
        divide-border
        rounded-md
        border
        "
            >
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </div>
        </DashboardShell>
    )
}