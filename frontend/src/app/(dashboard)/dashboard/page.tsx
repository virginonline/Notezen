import {AchievementWidget} from "@/component/achievement-widget";

export const metadata = {
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