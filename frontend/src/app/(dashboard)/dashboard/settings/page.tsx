import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {UserEditForm} from "@/component/user-edit-form";
import {User} from "@/lib/types/type";

export default async function SettingsPage() {

    const user : User = {
        id: "1",
        username: "bebra",
        token: "123"
    }

    return(
        <DashboardShell>
            <DashboardHeader heading={"Настройки"} text={"Редактирование данных аккаунта"}/>
            <div className='gap-10 grid'>
                <UserEditForm user={user}/>
            </div>
        </DashboardShell>
    )
}