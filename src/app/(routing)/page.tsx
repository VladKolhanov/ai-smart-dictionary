import Link from 'next/link'

import { ThemeToggle } from '@/features/theme-toggle'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <ThemeToggle />
    </div>
  )
}
