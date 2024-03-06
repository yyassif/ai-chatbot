import { ChatHistory } from '@/components/chat-history'
import { Sidebar } from '@/components/sidebar'

interface SidebarDesktopProps {
  userId?: string
}

export function SidebarDesktop({ userId }: SidebarDesktopProps) {
  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      <ChatHistory userId={userId} />
    </Sidebar>
  )
}
