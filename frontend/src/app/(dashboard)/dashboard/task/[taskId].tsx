import {Editor} from "@/component/editor";
import {getCurrentUser} from "@/lib/session";
import {Task} from "@/lib/types/type";
import {api} from "@/lib/api";

interface EditorPageProps {
    params: { taskId: string }
}
async function getTask(taskId:string) {
    const user = getCurrentUser();
    const task : Task = await api.get(`/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }).json();
    return task;
}
export async function TaskPage({ params }: EditorPageProps) {
    const task = await getTask(params.taskId);
    return(
        <div>
            <Editor task={task}/>
        </div>
    )
}