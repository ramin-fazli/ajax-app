import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/chat-components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/(app)/actions'
import { auth } from '@clerk/nextjs/server';

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SearchPageProps) {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }

  const chat = await getChat(params.id, userId)
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { userId } = auth()
  if (!userId) {
    redirect('/')
  }
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages
      }}
    >
      <Chat id={params.id} />
    </AI>
  )
}
