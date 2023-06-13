import {AchievementWidget} from "@/component/achievement-widget";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NextPageContext} from "next";
export const metadata = {
    title: 'Профиль',
    description: 'Приложение для трекинга задач',
}
DashboardPage.getInitialProps = async (ctx: NextPageContext) => {
    if(!cookies().has('_user')) {
        redirect('/login')
    }
}
export default async function DashboardPage() {

    return(
      <div>
        <AchievementWidget/>
      </div>
    )
}