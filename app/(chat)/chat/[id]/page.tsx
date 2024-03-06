import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { createClient } from '@/lib/supabase/server'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id, session.user.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
