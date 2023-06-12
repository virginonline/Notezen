"use client"
import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {TaskCreateButton} from "@/component/task/task-create-button";
import React from "react";
import {Task} from "@/lib/types/type";
import {TaskItem} from "@/component/task/task-item";

//todo
//fix filter
export default async function TasksPage() {
    const tasks: Task[] = [
        {
            id: 1,
            title: "Разработать ИС",
            description: "Разработать конфигурацию",
            author: "user32",
            project: "Проект 1",
            status: "Запланированно"
        },
        {
            id: 2,
            title: "Рефакторинг сервиса пользователей",
            description: "Выполнить рефакторинг сервиса пользователей",
            author: "user12",
            project: "Проект 2",
            status: "В процессе"
        },

    ]

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