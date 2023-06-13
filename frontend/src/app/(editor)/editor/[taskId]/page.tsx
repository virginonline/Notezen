import {getCurrentUser} from "@/lib/session";
import {Editor} from "@/component/editor";
import {Task} from "@/lib/types/type";

interface EditorPageProps {
    params: { taskId: string }
}
async function getTask(taskId:string) {
    const task : Task = {author: "", description: "", id: 0, project: "", status: "", title: ""};
/*     = await api.get(`/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }).json();*/
}
export default async function EditorPage({ params }: EditorPageProps) {
    const data = await getTask(params.taskId);
    return(
        <Editor/>
    )

}