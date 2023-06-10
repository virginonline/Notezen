"use client"
import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {TaskCreateButton} from "@/component/task/task-create-button";
import {TaskItemList} from "@/component/task/task-item-list";
import {TasksToolbar} from "@/component/task/tasks-toolbar";
import React, {useState} from "react";
import {Task} from "@/lib/types/type";
import useSearch from "@/hooks/useSearch";

//todo
//fix filter
export default async function TasksPage() {
    const filter = useSearch((state) => state.filter)
    const tasks : Task[] = [
        {
            id:1,
            title:"Разработать ИС",
            description: "Разработать конфигурацию",
            author: "user32",
            project:"Проект 1",
            status: "Запланированно"
        },
        {
            id:2,
            title:"Рефакторинг сервиса пользователей",
            description: "Выполнить рефакторинг сервиса пользователей",
            author: "user12",
            project:"Проект 2",
            status: "В процессе"
        },

    ]
    const [taskState, setTasksState] = useState<Task[]>(tasks)

    return(
        <DashboardShell>
            <DashboardHeader heading={"Задачи"} text={"Здесь храняться ваши задачи"}>
                <TaskCreateButton/>
            </DashboardHeader>
            <TasksToolbar />
            <TaskItemList tasks={taskState}/>
        </DashboardShell>
    )
}