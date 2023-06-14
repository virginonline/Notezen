import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {UserEditForm} from "@/component/user-edit-form";
import {User} from "@/lib/types/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Metadata} from "next";
import {getCurrentUserFromServer} from "@/lib/session";

const metadata: Metadata = {
    title: 'Настройки'
}

export default async function SettingsPage() {
    if(!cookies().has('_user')) {
        redirect('/login');
    }
    const usr : User = await getCurrentUserFromServer();

    return(
        <DashboardShell>
            <DashboardHeader heading={"Настройки"} text={"Редактирование данных аккаунта"}/>
            <div className='gap-10 grid'>
                <UserEditForm user={usr}/>
            </div>
        </DashboardShell>
    )
}