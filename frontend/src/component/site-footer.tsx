import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/component/ui/icons"
import { ModeToggle } from "@/component/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <Icons.logo />
        <ModeToggle />
      </div>
    </footer>
  )
}