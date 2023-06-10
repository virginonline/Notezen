"use client"
import React, {FC, useCallback, useEffect} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/component/ui/select";
import {TaskPreviewItem} from "@/component/task/task-preview";
import {ProjectPreview, TaskPreview} from "@/lib/types/type";
import {ProfileHeader} from "@/component/profile-header";
import {ProjectPreviewItem} from "@/component/project/project-preview-item";
import {useWelcomeScreen} from "@/hooks/use-welcome-screen";



export function AchievementWidget ()  {
    const {time, userWelcome} = useWelcomeScreen();
    const tasks : TaskPreview[] = [
        {
            id:1,
            title:"Разработать ИС",
            description: "Разработать конфигурацию",
        },
        {
            id:2,
            title:"Рефакторинг сервиса пользователей",
            description: "Выполнить рефакторинг сервиса пользователей",
        },
        {
            id:12,
            title:"Рефакторинг сервиса пользователей",
            description: "Выполнить рефакторинг сервиса пользователей",
        },
        {
            id:232,
            title:"Рефакторинг сервиса пользователей",
            description: "Выполнить рефакторинг сервиса пользователей",
        },

    ]
    const projects : ProjectPreview[] = [
        {
            id:1,
            title:"Проект 1",
            taskCount: "100"
        }
    ]

    return(
        <div className='grid items-start gap-8'>
            <ProfileHeader heading={time.current} text={userWelcome.current}/>
        <div
        className='
          rounded-md
          border
          p-6
          flex gap-6 md:gap-10
        '>
            <Select>
                <SelectTrigger className='
                   h-[25px]
                   w-[200px]
                '>
                    <SelectValue placeholder='Выбрать промежуток'/>
                </SelectTrigger>
                <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Отображение статистики за</SelectLabel>
                            <SelectItem value='WEEK'>За неделю</SelectItem>
                            <SelectItem value='MONTH'>За месяц</SelectItem>
                        </SelectGroup>
                </SelectContent>
            </Select>
            <div>
                Выполнено задач {100}
            </div>
            <div>
                Получено задач {6}
            </div>
        </div>
            <div className='
            grid
            gap-4
            grid-cols-2
            mt-6
            '>
                <div className='
                rounded
                border
                divide-border
                '>
                    {tasks.map((task) => (
                        <TaskPreviewItem key={task.id} task={task}/>
                    ))}
                </div>
                <div className='
                rounded
                border
                '
                >
                    {projects.map((project) => (
                        <ProjectPreviewItem key={project.id} project={project}/>
                    ))}
                </div>
            </div>
        </div>
    )
}