import { LanguageToggle } from '@/features/language-toggle'
import { ThemeToggle } from '@/features/theme-toggle'
import { ROUTES } from '@/lib/constants'
import { Link } from '@/ui/components/molecules/link'
import { HomeIcon } from '@/ui/icons'

export const HeaderActions = () => {
  return (
    <>
      <div className="absolute top-3 right-3 md:top-8 md:right-10 md:space-x-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <Link
        href={ROUTES.home}
        variant="ghost"
        className="absolute top-3 left-3 text-xl md:top-8 md:left-10"
      >
        <HomeIcon />
      </Link>
    </>
  )
}
