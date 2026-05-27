import { Logo } from "@/shared/components/ui/logo"
import { SidebarHeader as SidebarHeaderPrimitive } from "@/shared/components/ui/sidebar"
import { cn } from "@/shared/utils/cn"

type Props = {
  isCollapsed: boolean
  className?: string
}

export const SidebarHeader = ({ className, isCollapsed }: Props) => {
  return (
    <SidebarHeaderPrimitive
      className={cn(
        "flex-center h-14 border-b border-sidebar-border",
        className
      )}
    >
      <div
        className={cn(
          !isCollapsed && "px-2 py-1",
          isCollapsed && "justify-center"
        )}
      >
        <Logo
          className={cn(!isCollapsed && "aspect-auto w-26")}
          asSmall={isCollapsed}
        />
      </div>
    </SidebarHeaderPrimitive>
  )
}
