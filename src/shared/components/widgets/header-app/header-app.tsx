"use client"

import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import { LanguageToggle } from "@/shared/components/widgets/language-toggle"
import { ThemeToggle } from "@/shared/components/widgets/theme-toggle"
import { useIsMobile } from "@/shared/hooks"

export const HeaderApp = () => {
  const isMobile = useIsMobile()

  return (
    <header className="gap-sm grid h-14 grid-cols-[min-content_auto_min-content_min-content] items-center border-b border-sidebar-border px-4">
      {isMobile && <SidebarTrigger className="col-start-1" />}

      <ThemeToggle className="col-start-3" />
      <LanguageToggle className="col-start-4" />
    </header>
  )
}
