import React, {FC} from "react";
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
import {Project, Task, TaskPreview} from "@/lib/types/type";
import {DashboardHeader} from "@/component/header";
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {ProfileHeader} from "@/component/profile-header";

export async function AchievementWidget ()  {
    const {greeting, welcome} = await welcomeScreen();
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

    ]
    const projects : Project[] = [
        {
            id:1,
            title:"Проект 1",
            description: "Описание проекта",
            owner: "user1",
            status: "В процессе"
        }
    ]
    return(
        <div>
            <ProfileHeader heading={greeting}/>
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
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Отображение статистики за</SelectLabel>
                            <SelectItem value='WEEK'>За неделю</SelectItem>
                            <SelectItem value='MONTH'>За месяц</SelectItem>
                        </SelectGroup>
                    </SelectContent>
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
                '>
                    <TaskPreviewItem task={tasks[0]}/>
                </div>
                <div className='
                rounded
                border
                '
                >
                    projects
                </div>
            </div>
        </div>
    )
}