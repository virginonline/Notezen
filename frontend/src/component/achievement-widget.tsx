"use client"
import React, {useEffect, useState} from "react";
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
import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {getCurrentUserFromServer} from "@/lib/session";
import {getPreviewTasks} from "@/lib/api/task";
import {getPreviewProject} from "@/lib/api/project";



export function AchievementWidget() {
    //const [time, userWelcome] = await useWelcomeScreen();
    const [time, setTime] = useState('')
    const [greeting, setGreeting] = useState('');
    const [taskPreview, setTaskPreview] = useState<TaskPreview[]>([])

    useEffect(() => {
        (async () => {
            const user = await getCurrentUserFromServer();
            const {greeting, welcome} = welcomeScreen();
            const tskPreview = await getPreviewTasks();
            setGreeting(welcome(user.username))
            setTime(greeting)
            setTaskPreview(tskPreview)
        })();
    }, [])
    return (
        <div className='grid items-start gap-8'>
            <ProfileHeader heading={time} text={greeting}/>

                <div className='
                rounded
                border
                divide-border
                '>
                    {taskPreview.map((task) => (
                        <TaskPreviewItem key={task.id} task={task}/>
                    ))}
                </div>
        </div>
    )
}