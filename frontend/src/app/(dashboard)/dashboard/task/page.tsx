import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {TaskCreateButton} from "@/component/task-create-button";
import {Task} from "@/lib/types/type";
import {TaskItemList} from "@/component/task/task-item-list";

export default async function TasksPage() {
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
    return(
        <DashboardShell>
            <DashboardHeader heading={"Задачи"} text={"Здесь храняться ваши задачи"}>
                <TaskCreateButton/>
            </DashboardHeader>
            <TaskItemList tasks={tasks}/>
        </DashboardShell>
    )
}