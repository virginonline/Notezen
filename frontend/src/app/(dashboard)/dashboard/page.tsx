import {welcomeScreen} from "@/lib/web/state/ui/welcome";
import {AchievementWidget} from "@/component/achievement-widget";

export const metadata = {
    title: 'Профиль',
    description: 'Приложение для трекинга задач',
}

export default async function DashboardPage() {
    const {greeting, welcome} = await welcomeScreen();

    return(
      <div>
        <AchievementWidget/>
      </div>
    )
}