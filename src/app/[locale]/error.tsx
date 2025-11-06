'use client'

import { EmptyError } from '@/ui/components/molecules/empty-error'
import { TopBarWithActions } from '@/ui/components/molecules/top-bar-actions'

type Props = {
  error: Error
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <main className="grid h-dvh place-items-center">
      <TopBarWithActions />
      <EmptyError resetAction={reset} />
    </main>
  )
}
