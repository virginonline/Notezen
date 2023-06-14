import {AchievementWidget} from "@/component/achievement-widget";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Metadata, NextPageContext} from "next";
export const metadata : Metadata = {
    title: 'Профиль',
    description: 'Приложение для трекинга задач',
}

export default async function DashboardPage() {
    return(
      <div>
        <AchievementWidget/>
      </div>
    )
}