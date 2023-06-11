import {DashboardShell} from "@/component/shell";
import {DashboardHeader} from "@/component/header";
import {UserEditForm} from "@/component/user-edit-form";
import {User} from "@/lib/types/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function SettingsPage() {
    const cookieStore = cookies();
    const _user = cookieStore.has('_user')
    if(!_user) {
        redirect('/login')
    }
    const cook = cookieStore.get('_user')?.value!;
    const usr : User = JSON.parse(cook)
    return(
        <DashboardShell>
            <DashboardHeader heading={"Настройки"} text={"Редактирование данных аккаунта"}/>
            <div className='gap-10 grid'>
                <UserEditForm user={usr}/>
            </div>
        </DashboardShell>
    )
}