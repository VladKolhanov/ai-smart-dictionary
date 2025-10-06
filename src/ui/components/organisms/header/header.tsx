import { useTranslations } from 'next-intl'

import { LanguageToggle } from '@/features/language-toggle'
import { ThemeToggle } from '@/features/theme-toggle'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Link } from '@/ui/components/molecules/link'
import { Logo } from '@/ui/components/molecules/logo'
import { LogInIcon, UserPlusIcon } from '@/ui/icons'

type Props = {
  className?: string
}

export const Header = ({ className }: Props) => {
  const t = useTranslations('header')

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="gap-sm px-sm container mx-auto grid h-[70px] grid-cols-[1fr_max-content_max-content_max-content] items-center justify-items-start">
        <Link href={ROUTES.home} asWrapper>
          <Logo />
        </Link>

        <ThemeToggle />
        <LanguageToggle />

        <nav className="hidden gap-4 md:flex">
          <Link href={ROUTES.signIn} variant="outline">
            <LogInIcon /> {t('signIn')}
          </Link>
          <Link href={ROUTES.signUp}>
            <UserPlusIcon /> {t('signUp')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
