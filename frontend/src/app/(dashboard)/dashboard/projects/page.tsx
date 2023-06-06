import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import ProjectsCreateButton from "@/component/projects-create-button";
import {Button, buttonVariants} from "@/component/ui/button";
import {cn} from "@/lib/utils";
import {Icons} from "@/component/ui/icons";
import {Project} from "@/lib/types/Project";
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
                <ProjectsCreateButton btn={<button className={cn(buttonVariants({variant: "default"}))}>
                    <Icons.add className="mr-2 h-4 w-4" />
                    Создать новый проект
                </button>}/>
            </DashboardHeader>
            <ProjectItemList projects={projects}/>
        </DashboardShell>
    )
}