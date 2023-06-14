import {Editor} from "@/component/editor";
import {getProjects} from "@/lib/api/project";
import {getCurrentUserFromServer} from "@/lib/session";
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
        <div>
            <TaskPreview
                task={task}
            />
            <Comments
                task={task}
            />
        </div>
    )
}