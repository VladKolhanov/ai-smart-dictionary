'use client'

import { useTranslations } from 'next-intl'

import { useLocale } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/atoms/dropdown-menu'
import { UkraineFlagIcon, UnitedKingdomFlagIcon } from '@/ui/icons'

type Props = {
  className?: string
}

export const LanguageToggle = ({ className }: Props) => {
  const { locale, setLocale } = useLocale()

  const t = useTranslations('LanguageToggleComponent')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            className
          )}
          variant="ghost"
          size="icon"
        >
          {locale === 'en' ? <UnitedKingdomFlagIcon /> : <UkraineFlagIcon />}
          <span className="sr-only">{t('srLabel')}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">
          {t('language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setLocale('en')}>
          <UnitedKingdomFlagIcon /> {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('uk')}>
          <UkraineFlagIcon /> {t('ukrainian')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
