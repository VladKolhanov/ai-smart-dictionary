import { LanguageToggle } from '@/features/language-toggle'
import { ThemeToggle } from '@/features/theme-toggle'
import { Link } from '@/i18n/navigation'

export default function Home() {
  return (
    <div>
      <Link href="/about">About</Link>
      <ThemeToggle />
      <LanguageToggle />
    </div>
  )
}
