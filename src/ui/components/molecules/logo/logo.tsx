'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, systemTheme } = useTheme()
  const t = useTranslations('Logo')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const logoPath =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
      ? '/images/logo-light.webp'
      : '/images/logo-dark.webp'

  return (
    <div
      className={cn(
        'flex items-center gap-1 font-domine text-2xl font-bold',
        className
      )}
    >
      <Image src={logoPath} alt={t('altText')} width={40} height={40} />
      Smart Dictionary
    </div>
  )
}
