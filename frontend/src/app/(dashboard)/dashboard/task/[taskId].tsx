import {Editor} from "@/component/editor";
import {Task} from "@/lib/types/type";

interface EditorPageProps {
    params: { taskId: string }
}
async function getTask(taskId:string) {
    const t : Task = {
        assignedTo: "",
        author: "",
        description: "",
        expirationDate: undefined,
        id: 0,
        priority: "",
        project: "",
        status: "",
        title: ""
    }
    return t;

}
export async function TaskPage({ params }: EditorPageProps) {
    const task = await getTask(params.taskId);
    return(
        <div>
            <Editor task={task}/>
        </div>
    )
}