import {Task} from "@/lib/types/Task";
import {TaskItem} from "@/component/task/task-item";

interface TaskItemListProps {
    tasks : Task[]
}

export function TaskItemList({tasks}: TaskItemListProps) {
    return(
        <div
        className="
        divide-y
        divide-border
        rounded-md
        border
        "
        >
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task}/>
            ))}
        </div>
    )
}