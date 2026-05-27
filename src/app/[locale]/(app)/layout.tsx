import { getSessionOrRedirect } from "@/infrastructure/auth/utils"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { HeaderApp } from "@/shared/components/widgets/header-app"
import { Sidebar } from "@/shared/components/widgets/sidebar"
import type { LayoutProps } from "@/shared/types/global"

type Props = LayoutProps

export default async function AppLayout({ children }: Props) {
  await getSessionOrRedirect()

  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset className="flex min-h-screen flex-col">
        <HeaderApp />

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
