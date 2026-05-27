"use client"

import { useTransition } from "react"

import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { LogOutIcon } from "@/shared/icons"
import { cn } from "@/shared/utils/cn"

import * as actions from "../../actions"

type Props = Omit<React.ComponentProps<typeof Button>, "onClick">

export const ButtonSignout = ({
  className,
  variant = "destructive",
  children,
  ...props
}: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await actions.signOut()
    })
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex items-center justify-center gap-x-1 px-1.5",
        className
      )}
      variant={variant}
      {...props}
    >
      {isPending ? <Spinner /> : <LogOutIcon className="size-4" />}

      {children}
    </Button>
  )
}
