import {DashboardConfig} from "@/lib/types";

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Проекты",
            href: "/projects",
        },
        {
            title: "Задачи",
            href: "/tasks",
        },
        {
            title: "Профиль",
            href: "/dashboard"
        }
    ],
    sidebarNav: [
        {
            title: "Проекты",
            href: "/dashboard/projects",
            icon: "project",
        },
        {
            title: "Задачи",
            href: "/dashboard/task",
            icon: "post",
        },
    ],
}