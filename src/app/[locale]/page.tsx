import { LanguageToggle } from '@/features/language-toggle'
import { ThemeToggle } from '@/features/theme-toggle'
import { Link } from '@/ui/components/molecules/link'
import { Logo } from '@/ui/components/molecules/logo'

export default function Home() {
  return (
    <div>
      <Link href="/about">About</Link>
      <ThemeToggle />
      <LanguageToggle />
      <Logo />
    </div>
  )
}
