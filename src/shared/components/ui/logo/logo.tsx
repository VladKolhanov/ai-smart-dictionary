"use client"

import Image from "next/image"

import { logoDarkSmall, logoLight, logoLightSmall } from "@/shared/images"
import { cn } from "@/shared/utils/cn"

type Props = {
  asSmall?: boolean
  className?: string
}

export const Logo = ({ asSmall, className }: Props) => {
  return (
    <>
      <Image
        src={asSmall ? logoLightSmall : logoLight}
        placeholder="blur"
        alt=""
        className={cn(
          "block h-7.5 w-30 dark:hidden",
          asSmall && "h-9",
          className
        )}
      />
      <Image
        src={asSmall ? logoDarkSmall : logoLight}
        placeholder="blur"
        alt=""
        className={cn(
          "hidden h-7.5 w-30 dark:block",
          asSmall && "h-9",
          className
        )}
      />
    </>
  )
}
