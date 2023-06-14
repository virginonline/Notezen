import {getTask} from "@/lib/api/task";
import {Comments} from "@/component/comment/comments-list";
import {TaskPreview} from "@/component/task/task-preview-page";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type EditorPageProps =  {
    params: { taskId: string }
}
async function fetchTask(taskId:string)  {
    return await getTask(taskId)

}

export default async function TaskPage({ params }: { params: { taskId: string } }) {
    if(!cookies().has('_user')) {
        redirect('/login');
    }
    const task = await fetchTask(params.taskId);
    return(
        <div className='grid'>
            <TaskPreview
                className='row-end-3 row-span-2'
                task={task}
            />
            <Comments
                className='row-end-3 row-span-2'
                task={task}
            />
        </div>
    )
}