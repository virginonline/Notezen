import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import ProjectsCreateButton from "@/component/projects-create-button";
import {Project} from "@/lib/types/type";
import {ProjectItemList} from "@/component/project/project-item-list";
import {getProjects} from "@/lib/api/project";

async function fetchProjects() : Promise<Project[]> {
    return await getProjects();
}
export default async function ProjectsPage() {
    const projects : Project[] = await fetchProjects();
    return (
        <DashboardShell>
            <DashboardHeader heading="Проекты" text="Доступные проекты" >
                <ProjectsCreateButton/>
            </DashboardHeader>
            <ProjectItemList projects={projects}/>
        </DashboardShell>
    )
}