import {AchievementWidget} from "@/component/achievement-widget";

import {User} from "@/lib/types/type";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
export const metadata = {
    title: 'Профиль',
    description: 'Приложение для трекинга задач',
}
export default async function DashboardPage() {
    const _user = cookies().has('_user')
    if(!_user) {
        redirect('/login')
    }
    return(
      <div>
        <AchievementWidget/>
      </div>
    )
}