"use client"

import { useTranslations } from "next-intl"

import {
  Sidebar as SidebarPrimitive,
  SidebarSeparator,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import { navItems } from "@/shared/constants"
import { useIsMobile } from "@/shared/hooks"

import { SidebarFooter } from "./sidebar-footer"
import { SidebarHeader } from "./sidebar-header"
import { SidebarMain } from "./sidebar-main"

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  const { state, toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()
  const t = useTranslations("sidebar")
  const isCollapsed = state === "collapsed"

  return (
    <SidebarPrimitive
      collapsible="icon"
      variant="sidebar"
      className={className}
    >
      <SidebarHeader isCollapsed={isCollapsed} />

      <SidebarMain
        t={t}
        isCollapsed={isCollapsed}
        items={navItems}
      />

      <SidebarSeparator />

      <SidebarFooter
        t={t}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </SidebarPrimitive>
  )
}
