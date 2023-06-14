import {getProject, getProjects, getTasksOfProject} from "@/lib/api/project";
import {Project, Task} from "@/lib/types/type";
import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {TaskCreateButton} from "@/component/task/task-create-button";
import {TaskItem} from "@/component/task/task-item";

type projectPageProps = {
    params: { projectId: string }
}

async function fetchTaskProjects(projectId : string) {
    const tasks = await getTasksOfProject(projectId);
    const projectInfo : Project = await getProject(projectId);

    return {tasks, projectInfo}
}
export default async function ProjectPage({params} : projectPageProps) {
    const {tasks, projectInfo} = await fetchTaskProjects(params.projectId);
    return(
        <DashboardShell>
            <DashboardHeader heading={projectInfo.title} text={projectInfo.description}>
                <TaskCreateButton/>
            </DashboardHeader>
            <div>
                {tasks.length === 0 ? (
                    <h3>В данном проекте еще нет задач</h3>
                ) : (
                    tasks.map((task) => (
                        <TaskItem key={task.id} task={task}/>
                    ))
                )}
            </div>
        </DashboardShell>
    )
}