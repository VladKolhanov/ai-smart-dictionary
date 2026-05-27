import type { User } from "better-auth"

import { ButtonSignout } from "@/domain/auth/components/button-signout"
import { AvatarWithDescription } from "@/shared/components/ui/avatar-with-description"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Link } from "@/shared/components/ui/link"
import {
  SidebarFooter as SidebarFooterPrimitive,
  type useSidebar,
} from "@/shared/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { Routes } from "@/shared/constants"
import { ChevronsLeftIcon, ChevronsRightIcon, UserIcon } from "@/shared/icons"
import type { TFunction } from "@/shared/types/i18n"
import { cn } from "@/shared/utils/cn"

type Props = {
  name: User["name"]
  email: User["email"]
  image: User["image"]
  toggleSidebar: ReturnType<typeof useSidebar>["toggleSidebar"]
  isCollapsed: boolean
  isMobile: boolean
  t: TFunction<"sidebar">
  className?: string
}

export const SidebarFooter = ({
  name,
  email,
  image,
  toggleSidebar,
  isCollapsed,
  isMobile,
  t,
  className,
}: Props) => {
  return (
    <SidebarFooterPrimitive className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="cursor-pointer rounded-lg transition-colors hover:bg-sidebar-accent">
              <AvatarWithDescription
                name={name}
                email={email}
                image={image}
                isShowDescription={!isCollapsed}
              />
            </button>
          }
        />
        <DropdownMenuContent
          side="top"
          align="start"
          className="w-52"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <AvatarWithDescription
                name={name}
                email={email}
                image={image}
                isShowDescription={true}
              />
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <Link
            href={Routes.Profile}
            variant="wrapper"
            className="flex gap-2 hover:bg-sidebar-accent"
          >
            <DropdownMenuItem>
              <UserIcon className="size-4" />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <ButtonSignout
            variant="wrapper"
            size="sm"
            className="flex w-full justify-start rounded-none text-destructive hover:bg-sidebar-accent"
          >
            <span>{t("signOut")}</span>
          </ButtonSignout>
        </DropdownMenuContent>
      </DropdownMenu>

      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                onClick={toggleSidebar}
              >
                <ChevronsRightIcon className="size-5" />
                <span className="sr-only">{t("expand")}</span>
              </Button>
            }
          />
          <TooltipContent side="right">{t("expand")}</TooltipContent>
        </Tooltip>
      ) : (
        !isMobile && (
          <Button
            variant="ghost"
            onClick={toggleSidebar}
          >
            <ChevronsLeftIcon className="size-5" />
            <span className="sr-only">{t("collapse")}</span>
          </Button>
        )
      )}
    </SidebarFooterPrimitive>
  )
}
