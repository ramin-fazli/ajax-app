import { auth } from '@clerk/nextjs/server';
import type { CoreMessage } from 'ai';
import { generateId } from 'ai';
import type {
  StreamableValue,
} from 'ai/rsc';
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
} from 'ai/rsc';

import { AnswerSection } from '@/chat-components/answer-section';
import { CanvasSection } from '@/chat-components/canvas-section';
import { CopilotDisplay } from '@/chat-components/copilot-display';
import { FollowupPanel } from '@/chat-components/followup-panel';
import RetrieveSection from '@/chat-components/retrieve-section';
import SearchRelated from '@/chat-components/search-related';
import { SearchSection } from '@/chat-components/search-section';
import { Section } from '@/chat-components/section';
import { UserMessage } from '@/chat-components/user-message';
import { VideoSearchSection } from '@/chat-components/video-search-section';
import { saveChat } from '@/lib/actions/chat';
import { workflow } from '@/lib/actions/workflow';
import type { AIMessage, Chat } from '@/lib/types';
import { isProviderEnabled } from '@/lib/utils/registry';

const MAX_MESSAGES = 6;

async function submit(
  formData?: FormData,
  skip?: boolean,
  retryMessages?: AIMessage[],
) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isGenerating = createStreamableValue(true);
  const isCollapsed = createStreamableValue(false);

  const aiMessages = [...(retryMessages ?? aiState.get().messages)];
  // Get the messages from the state, filter out the tool messages
  const messages: CoreMessage[] = aiMessages
    .filter(
      message =>
        message.role !== 'tool'
        && message.type !== 'followup'
        && message.type !== 'related'
        && message.type !== 'end',
    )
    .map((message) => {
      const { role, content } = message;
      return { role, content } as CoreMessage;
    });

  // Limit the number of messages to the maximum
  messages.splice(0, Math.max(messages.length - MAX_MESSAGES, 0));
  // Get the user input from the form data
  const userInput = skip
    ? `{"action": "skip"}`
    : (formData?.get('input') as string);

  const content = skip
    ? userInput
    : formData
      ? JSON.stringify(Object.fromEntries(formData))
      : null;
  const type = skip
    ? undefined
    : formData?.has('input')
      ? 'input'
      : formData?.has('related_query')
        ? 'input_related'
        : 'inquiry';

  // Get the model from the form data (e.g., openai:gpt-4o-mini)
  const model = 'google:gemini-2.0-flash-exp'; // (formData?.get('model') as string) || 'google:gemini-2.0-flash-exp'
  const providerId = model.split(':')[0];
  // Check if provider is enabled
  if (!isProviderEnabled(providerId)) {
    throw new Error(
      `Provider ${providerId} is not available (API key not configured or base URL not set)`,
    );
  }

  // Add the user message to the state
  if (content) {
    const contentObj = JSON.parse(content);
    contentObj.model = model;
    const updatedContent = JSON.stringify(contentObj);

    aiState.update({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: generateId(),
          role: 'user',
          content: updatedContent,
          type,
        },
      ],
    });
    messages.push({
      role: 'user',
      content: updatedContent,
    });
  }

  // Run the agent workflow
  workflow(
    { uiStream, isCollapsed, isGenerating },
    aiState,
    messages,
    skip ?? false,
    model,
  );

  return {
    id: generateId(),
    isGenerating: isGenerating.value,
    component: uiStream.value,
    isCollapsed: isCollapsed.value,
  };
}

export type AIState = {
  messages: AIMessage[];
  chatId: string;
  isSharePage?: boolean;
};

export type UIState = {
  id: string;
  component: React.ReactNode;
  isGenerating?: StreamableValue<boolean>;
  isCollapsed?: StreamableValue<boolean>;
}[];

const initialAIState: AIState = {
  chatId: generateId(),
  messages: [],
};

const initialUIState: UIState = [];

export const getUIStateFromAIState = (aiState: Chat) => {
  const chatId = aiState.chatId;
  const isSharePage = aiState.isSharePage;

  // Ensure messages is an array of plain objects
  const messages = Array.isArray(aiState.messages)
    ? aiState.messages.map(msg => ({ ...msg }))
    : [];

  return messages
    .map((message, index) => {
      const { role, content, id, type, name } = message;

      if (
        !type
        || type === 'end'
        || (isSharePage && type === 'related')
        || (isSharePage && type === 'followup')
      ) {
        return null;
      }

      switch (role) {
        case 'user':
          switch (type) {
            case 'input':
            case 'input_related': {
              const json = JSON.parse(content);
              const value = type === 'input' ? json.input : json.related_query;
              return {
                id,
                component: (
                  <UserMessage
                    message={value}
                    chatId={chatId}
                    showShare={index === 0 && !isSharePage}
                  />
                ),
              };
            }
            case 'inquiry':
              return {
                id,
                component: <CopilotDisplay content={content} />,
              };
            default:
              return null;
          }
        case 'assistant': {
          const answer = createStreamableValue();
          answer.done(content);
          switch (type) {
            case 'answer': {
              const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
              const agentServerUrl = (environment === 'production'
                ? process.env.NEXT_PUBLIC_AGENT_SERVER_URL
                : process.env.NEXT_PUBLIC_AGENT_SERVER_URL_DEV) || 'https://agent.tryajax.com';
              const TemplateID = aiState.messages.find(
                message => message.type === 'agentCreator',
              )?.content || '0';
              return {
                id,
                component: (
                  <>
                    <CanvasSection
                      agentServerUrl={agentServerUrl}
                      TemplateID={TemplateID}
                    />
                    <AnswerSection result={answer.value} />
                  </>
                ),
              };
            }
            case 'related': {
              const relatedQueries = createStreamableValue();
              relatedQueries.done(JSON.parse(content));
              return {
                id,
                component: (
                  <SearchRelated relatedQueries={relatedQueries.value} />
                ),
              };
            }
            case 'followup':
              return {
                id,
                component: (
                  <Section title="Refine" className="pb-8">
                    <FollowupPanel />
                  </Section>
                ),
              };
            default:
              return null;
          }
        }
        case 'tool': {
          try {
            const toolOutput = JSON.parse(content);
            const isCollapsed = createStreamableValue();
            isCollapsed.done(true);
            const searchResults = createStreamableValue();
            searchResults.done(JSON.stringify(toolOutput));
            switch (name) {
              case 'search':
                return {
                  id,
                  component: <SearchSection result={searchResults.value} />,
                  isCollapsed: isCollapsed.value,
                };
              case 'retrieve':
                return {
                  id,
                  component: <RetrieveSection data={toolOutput} />,
                  isCollapsed: isCollapsed.value,
                };
              case 'videoSearch':
                return {
                  id,
                  component: (
                    <VideoSearchSection result={searchResults.value} />
                  ),
                  isCollapsed: isCollapsed.value,
                };
              default:
                return null;
            }
          } catch {
            return {
              id,
              component: null,
            };
          }
        }
        default:
          return {
            id,
            component: null,
          };
      }
    })
    .filter(message => message !== null) as UIState;
};

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI<AIState, UIState>({
  actions: {
    submit,
  },
  initialUIState,
  initialAIState,
  onGetUIState: async () => {
    'use server';

    const aiState = getAIState();
    if (aiState) {
      const uiState = getUIStateFromAIState(aiState as Chat);
      return uiState;
    }
    return [];
  },
  onSetAIState: async ({ state }) => {
    'use server';

    // Check if there is any message of type 'answer' in the state messages
    if (!state.messages.some(e => e.type === 'answer')) {
      return;
    }

    const { chatId, messages } = state;
    const createdAt = new Date();
    const { userId } = auth();
    if (!userId) {
      throw new Error('User ID is null');
    }
    const path = `/search/${chatId}`;
    const title
      = messages.length > 0
        ? JSON.parse(messages[0].content)?.input?.substring(0, 100)
        || 'Untitled'
        : 'Untitled';
    // Add an 'end' message at the end to determine if the history needs to be reloaded
    const updatedMessages: AIMessage[] = [
      ...messages,
      {
        id: generateId(),
        role: 'assistant',
        content: `end`,
        type: 'end',
      },
    ];

    const chat: Chat = {
      id: chatId,
      createdAt,
      userId,
      path,
      title,
      messages: updatedMessages,
    };
    await saveChat(chat, userId);
  },
});
