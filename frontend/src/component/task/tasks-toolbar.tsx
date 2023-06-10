import {Input} from "@/component/ui/input";
import {SelectPriority} from "@/component/select-priority";
import React, {useCallback} from "react";
import useSearch from "@/hooks/useSearch";

export function TasksToolbar() {
    const {filter, setFilter} = useSearch()
    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
        console.log(filter)
    },[filter]);
    return(
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                <Input onChange={(event) => handleOnChange(event)} placeholder='Введите название задачи'/>
                <SelectPriority/>
            </div>
        </div>
    )
}