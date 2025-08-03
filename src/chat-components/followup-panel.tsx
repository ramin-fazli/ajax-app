'use client';

import { useActions, useUIState } from 'ai/rsc';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import type { AI } from '@/dashboard/actions';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { models } from '@/lib/types/models';
import { getDefaultModelId } from '@/lib/utils';
import { useAppState } from '@/lib/utils/app-state';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserMessage } from './user-message';

export function FollowupPanel() {
  const [input, setInput] = useState('');
  const { submit } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const { isGenerating, setIsGenerating } = useAppState();

  const [selectedModelId] = useLocalStorage<string>(
    'selectedModel',
    getDefaultModelId(models),
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    setInput('');

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    // Add model information to formData
    formData.set('model', selectedModelId);

    const userMessage = {
      id: Date.now(),
      isGenerating: false,
      component: <UserMessage message={input} />,
    };

    const responseMessage = await submit(formData);
    setMessages(currentMessages => [
      ...currentMessages,
      userMessage,
      responseMessage,
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center space-x-1"
    >
      <Input
        type="text"
        name="input"
        placeholder="How can I help refine the generated Agentic AI Workflow?"
        value={input}
        className="h-12 pr-14"
        onChange={e => setInput(e.target.value)}
      />
      <Button
        type="submit"
        size="icon"
        disabled={input.length === 0 || isGenerating}
        variant="ghost"
        className="absolute right-1"
      >
        <ArrowRight size={20} />
      </Button>
    </form>
  );
}
