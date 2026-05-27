import type { Messages } from "next-intl"

import { Link } from "@/shared/components/ui/link"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import type { Icon } from "@/shared/types/global"
import type { TFunction } from "@/shared/types/i18n"
import { cn } from "@/shared/utils/cn"

type Props = {
  className?: string
  isCollapsed: boolean
  t: TFunction<"sidebar">
  items: {
    title: keyof Messages["sidebar"]
    href: string
    icon: Icon
  }[]
}

export const SidebarMain = ({ className, t, items, isCollapsed }: Props) => {
  return (
    <SidebarContent className={cn(className)}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className={cn("gap-2", isCollapsed && "items-center")}>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link
                  variant="wrapper"
                  href={item.href}
                >
                  <SidebarMenuButton
                    tooltip={t(item.title)}
                    className={cn(
                      "cursor-pointer",
                      isCollapsed && "flex-center"
                    )}
                  >
                    <item.icon className="size-7!" />

                    {!isCollapsed && (
                      <p className="text-lg font-medium">{t(item.title)}</p>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
