'use client';

import { useActions, useAIState, useUIState } from 'ai/rsc';
import { RefreshCcw } from 'lucide-react';
import React from 'react';

import type { AI } from '@/app/[locale]/(auth)/(main)/(dashboard)/dashboard/actions';
import type { AIMessage } from '@/lib/types';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';

type ErrorCardProps = {
  errorMessage: string;
};

export const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState<typeof AI>();
  const { submit } = useActions();

  const handleRetry = async () => {
    // Remove the last message from the UIState
    setMessages(messages.slice(0, -1));

    const aiMessages = aiState.messages;
    // Get the last message with role = user
    const lastUserMessage = [...aiMessages]
      .reverse()
      .find(m => m.role === 'user');

    let retryMessages: AIMessage[] = [];
    // Remove messages after lastUserMessage, cannot identify by id, so process by order
    if (lastUserMessage) {
      const lastUserMessageIndex = aiMessages.findIndex(
        m => m === lastUserMessage,
      );
      retryMessages = aiMessages.slice(0, lastUserMessageIndex + 1);
    }
    // Request retry from the server and add the response to the current messages
    const response = await submit(undefined, false, retryMessages);
    setMessages(currentMessages => [...currentMessages, response]);
  };

  return (
    <Card className="p-4">
      <form
        className="flex flex-col items-center space-y-4"
        action={handleRetry}
      >
        <Label>{errorMessage}</Label>
        <Button size="sm" className="w-fit" type="submit">
          <RefreshCcw size={14} className="mr-1" />
          Retry
        </Button>
      </form>
    </Card>
  );
};
