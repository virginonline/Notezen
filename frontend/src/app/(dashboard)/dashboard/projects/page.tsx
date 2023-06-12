import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import ProjectsCreateButton from "@/component/projects-create-button";
import {Project} from "@/lib/types/type";
import {ProjectItemList} from "@/component/project/project-item-list";


export default async function ProjectsPage() {

    const projects : Project[] = [
        {
            id:1,
            title:"Проект 1",
            description: "Описание проекта",
            owner: "user1",
            status: "В процессе"
        }
    ]
    return (
        <DashboardShell>
            <DashboardHeader heading="Проекты" text="Доступные проекты" >
                <ProjectsCreateButton/>
            </DashboardHeader>
            <ProjectItemList projects={projects}/>
        </DashboardShell>
    )
}