import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {EditUserButton} from "@/component/edit-user-button";

export default async function UserPage() {
    return(
        <DashboardShell>
            <DashboardHeader heading={"Профиль"}>
                <EditUserButton/>
            </DashboardHeader>
        </DashboardShell>
    )
}