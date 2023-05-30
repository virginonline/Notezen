import Link from "next/link"

import { cn } from "@/lib/utils"
import { SiteFooter } from "@/component/site-footer"
import { buttonVariants } from "@/component/ui/button"
import { MainNav } from "@/component/main-nav"
import { mainNavConfig } from "@/lib/config/mainNav"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={mainNavConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Авторизация
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}