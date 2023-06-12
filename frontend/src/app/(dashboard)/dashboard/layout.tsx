import {MainNav} from "@/component/main-nav";
import {DashboardNav} from "@/component/nav";
import {SiteFooter} from "@/component/site-footer";
import {dashboardConfig} from "@/lib/config/dashboard";
import {getCurrentUser} from "@/lib/session";
import {UserAccountNav} from "@/component/user-account-nav";
import {User} from "@/lib/types/type";
import {parseCookies} from "nookies";

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({children} : DashboardLayoutProps) {

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                    <UserAccountNav/>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <SiteFooter className="border-t" />
        </div>
    )
}