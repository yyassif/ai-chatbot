import { SidebarDesktop } from '@/components/sidebar-desktop'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const userId = session?.user?.id as string

  if (!userId) {
    redirect('/login')
  }

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <SidebarDesktop userId={userId} />
      <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        {children}
      </div>
    </div>
  )
}
