import {DashboardConfig} from "@/lib/types";

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Проекты",
            href: "/dashboard/projects",
        },
        {
            title: "Задачи",
            href: "/dashboard/task",
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
        {
            title: "Настройки",
            href: "/dashboard/settings",
            icon: "settings",
        },

    ],
}