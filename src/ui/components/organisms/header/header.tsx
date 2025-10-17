import { useTranslations } from 'next-intl'

import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/ui/components/atoms/button'
import { Separator } from '@/ui/components/atoms/separator'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/ui/components/atoms/sheet'
import { LanguageToggle } from '@/ui/components/molecules/language-toggle'
import { Link } from '@/ui/components/molecules/link'
import { Logo } from '@/ui/components/molecules/logo'
import { ThemeToggle } from '@/ui/components/molecules/theme-toggle'
import { LogInIcon, MenuIcon, UserPlusIcon } from '@/ui/icons'

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

        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="min-h-1/2" side="bottom">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col items-center gap-4">
              {/* TODO: place for list navigation on home page section (Features, Prices ...) */}
              <ul>
                <li>Subtitle 1</li>
                <li>Subtitle 2</li>
                <li>Subtitle 3</li>
              </ul>

              <Separator />

              <div className="grid w-full grid-cols-[.8fr] grid-rows-2 justify-center gap-2 sm:grid-cols-[.5fr]">
                <Link href={ROUTES.signIn} variant="outline">
                  <LogInIcon /> {t('signIn')}
                </Link>
                <Link href={ROUTES.signUp}>
                  <UserPlusIcon /> {t('signUp')}
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
