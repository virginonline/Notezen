import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import ProjectsCreateButton from "@/component/projects-create-button";
import {Project, User} from "@/lib/types/type";
import {ProjectItemList} from "@/component/project/project-item-list";
import {getProjects} from "@/lib/api/project";
import {getCurrentUserFromServer} from "@/lib/session";
import {Metadata} from "next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const metadata: Metadata = {
    title: 'Проекты',
    description: 'Проекты пользователя'
}

async function fetchProjects() : Promise<Project[]> {
    const user : User = await getCurrentUserFromServer();
    return await getProjects(user);
}
export default async function ProjectsPage() {
    if(!cookies().has('_user')) {
        redirect('/login');
    }
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