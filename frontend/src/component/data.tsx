import {Icons} from "@/component/ui/icons";
import {Icon} from "lucide-react";
import {Priority, ProjectStatus, TaskStatus} from "@/lib/types/type";

export const TaskStatuses : TaskStatus[] = [
    {
        label: 'Запланированно',
        value: 'PLANNED',
        icon: Icons.circle
    },
    {
        label: 'В прогрессе',
        value: 'IN_PROGRESS',
        icon: Icons.circle
    },
    {
        label: 'Выполнено',
        value: 'COMPLETE',
        icon: Icons.circle
    },
    {
        label: 'Приостановлено',
        value: 'PAUSE',
        icon: Icons.circle
    },
]


export const ProjectStatuses : ProjectStatus[] = [
    {
        label: 'Запланированно',
        value: 'PLANNED',
        icon: Icons.circle
    },
    {
        label: 'В процессе',
        value: 'IN_PROGRESS',
        icon: Icons.circle
    },
    {
        label: 'Выполнено',
        value: 'COMPLETE',
        icon: Icons.circle
    },
    {
        label: 'Приостановлено',
        value: 'PAUSE',
        icon: Icons.circle
    },
]

export const Priorities : Priority[] = [
    {
        label: 'Высокий',
        value: 'HIGH',
        icon: Icons.circle
    },
    {
        label: 'Средний',
        value: 'MEDIUM',
        icon: Icons.circle
    },
    {
        label: 'Низкий',
        value: 'LOW',
        icon: Icons.circle
    },
]