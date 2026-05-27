"use client"

import type { User } from "better-auth"
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
  user: User
  className?: string
}

export const Sidebar = ({ user, className }: Props) => {
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
        name={user.name}
        image={user.image}
        email={user.email}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </SidebarPrimitive>
  )
}
