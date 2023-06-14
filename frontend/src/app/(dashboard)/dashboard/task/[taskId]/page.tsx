import {Editor} from "@/component/editor";
import {getProjects} from "@/lib/api/project";
import {getCurrentUserFromServer} from "@/lib/session";
import {getTask} from "@/lib/api/task";

interface EditorPageProps {
    params: { taskId: string }
}
async function fetchTask(taskId:string)  {
    const user = await getCurrentUserFromServer();
    const task =  await getTask(taskId)
    const projects = await getProjects(user)
    return {task, projects};
}

export default async function TaskPage({ params }: { params: { taskId: string } }) {
    const {task, projects} = await fetchTask(params.taskId);
    return(
        <div>
            <Editor
            task={task}
            availableProjects={projects}
            />
        </div>
    )
}