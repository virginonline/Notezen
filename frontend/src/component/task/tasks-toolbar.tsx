"use client"
import {Input} from "@/component/ui/input";
import {useState} from "react";
import {SelectPriority} from "@/component/select-priority";

export function TasksToolbar() {
    const [filter, setFilter] = useState<string>('')

    return(
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                <Input placeholder='Task filter'/>
                <SelectPriority/>
            </div>
        </div>
    )
}