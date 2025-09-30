'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props) => {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'flex items-center gap-1 font-domine text-2xl font-bold',
        className
      )}
    >
      <Image
        src={
          theme === 'light'
            ? '/images/logo-dark.webp'
            : '/images/logo-light.webp'
        }
        alt="Ai Smart Dictionary Logo"
        width={40}
        height={40}
      />
      Smart Dictionary
    </div>
  )
}
