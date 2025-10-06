import { HeaderActions } from '@/ui/components/molecules/header-actions'
import { Empty404 } from '@/ui/components/organisms/empty-404'

export default function NotFound() {
  return (
    <main className="grid h-dvh place-items-center">
      <HeaderActions />
      <Empty404 />
    </main>
  )
}
