import { Chat } from '@/chat-components/chat'
import { generateId } from 'ai'
import { AI } from '@/(app)/actions'

export const maxDuration = 60

const DashboardIndexPage = () => {
  const id = generateId()


  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
        <Chat id={id} />
    </AI>
  );
};

export default DashboardIndexPage;
