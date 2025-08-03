'use client';

import { generateId } from 'ai';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { RotateCcw, StepForward } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';
import { toast } from 'sonner';

import type { AI, UIState } from '@/app/[locale]/(auth)/(main)/(dashboard)/dashboard/actions';
import { TypingText } from '@/chat-components/ui/typewriter';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { models } from '@/lib/types/models';
import { cn, getDefaultModelId } from '@/lib/utils';
import { useAppState } from '@/lib/utils/app-state';

import { EmptyScreen } from './empty-screen';
import { Button } from './ui/button';
import { UserMessage } from './user-message';

type ChatPanelProps = {
  messages: UIState;
  query?: string;
  onModelChange?: (id: string) => void;
};

export function ChatPanel({ messages, query }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [, setMessages] = useUIState<typeof AI>();
  const [aiMessage, setAIMessage] = useAIState<typeof AI>();
  const { isGenerating, setIsGenerating } = useAppState();
  const { submit } = useActions();
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true); // For development environment

  const [selectedModelId] = useLocalStorage<string>(
    'selectedModel',
    getDefaultModelId(models),
  );

  const [isComposing, setIsComposing] = useState(false); // Composition state
  const [enterDisabled, setEnterDisabled] = useState(false); // Disable Enter after composition ends
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const emptyScreenRef = useRef<HTMLDivElement>(null);

  // Clear messages
  const handleClear = () => {
    setIsGenerating(false);
    setMessages([]);
    setAIMessage({ messages: [], chatId: '' });
    setInput('');
    router.push('/');
  };

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = () => {
    setIsComposing(false);
    setEnterDisabled(true);
    setTimeout(() => {
      setEnterDisabled(false);
    }, 300);
  };

  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Check if the related target is inside EmptyScreen
    const relatedTarget = e.relatedTarget as Node;
    if (emptyScreenRef.current && emptyScreenRef.current.contains(relatedTarget)) {
      return;
    }
    setIsTextareaFocused(false);
  };

  async function handleQuerySubmit(query: string, formData?: FormData) {
    setInput(query);
    setIsGenerating(true);

    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: generateId(),
        component: <UserMessage message={query} />,
      },
    ]);

    // Use existing formData or create new one
    const data = formData || new FormData();

    // Add or update the model information
    const modelString = selectedModelId;
    data.set('model', modelString);

    // Add or update the input query if not already present
    if (!formData) {
      data.set('input', query);
    }

    const responseMessage = await submit(data);
    setMessages(currentMessages => [...currentMessages, responseMessage]);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await handleQuerySubmit(input, formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`${error}`);

      handleClear();
    }
  };

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      handleQuerySubmit(query);
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const lastMessage = aiMessage.messages.slice(-1)[0];
    if (lastMessage?.type === 'followup' || lastMessage?.type === 'inquiry') {
      setIsGenerating(false);
    }
  }, [aiMessage, setIsGenerating]);

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus();
  }, []);

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0) {
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-2 mx-auto flex items-center justify-center md:bottom-8">
        <Button
          type="button"
          variant="secondary"
          className="group pointer-events-auto rounded-full bg-secondary/80 transition-all hover:scale-105"
          onClick={() => handleClear()}
          disabled={isGenerating}
        >
          <span className="mr-2 hidden text-sm duration-300 animate-in fade-in group-hover:block">
            Start Over
          </span>
          <RotateCcw size={18} className="transition-all group-hover:rotate-90" />
        </Button>
      </div>
    );
  }

  if (query && query.trim().length > 0) {
    return null;
  }

  return (
    <div>
      <div className="m-auto my-6 flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
        <TypingText strings={['<strong>Let\'s build your agentic AI workflow.</strong>']} typeSpeed={50} loop={false} />
      </div>
      <div className="fixed inset-x-0 bottom-8 top-10 mx-auto flex h-screen flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl px-6">
          <div className="relative flex w-full items-center">
            {/*           <ModelSelector
            selectedModelId={selectedModelId}
            onModelChange={id => {
              setSelectedModelId(id)
              onModelChange?.(id)
            }}
          /> */}
            <Textarea
              ref={inputRef}
              name="input"
              rows={1}
              maxRows={5}
              tabIndex={0}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="What workflow do you need?"
              spellCheck={false}
              value={input}
              className="min-h-20 w-full resize-none border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
              // Enter should submit the form, but disable it right after IME input confirmation
                if (
                  e.key === 'Enter'
                  && !e.shiftKey
                  && !isComposing // Not in composition
                  && !enterDisabled // Not within the delay after confirmation
                ) {
                // Prevent the default action to avoid adding a new line
                  if (input.trim().length === 0) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.form?.requestSubmit();
                }
              }}
              onHeightChange={(height) => {
              // Ensure inputRef.current is defined
                if (!inputRef.current) {
                  return;
                }

                // The initial height and left padding is 70px and 2rem
                const initialHeight = 70;
                // The initial border radius is 32px
                const initialBorder = 32;
                // The height is incremented by multiples of 20px
                const multiple = (height - initialHeight) / 20;

                // Decrease the border radius by 4px for each 20px height increase
                const newBorder = initialBorder - 4 * multiple;
                // The lowest border radius will be 8px
                inputRef.current.style.borderRadius
                = `${Math.max(8, newBorder)}px`;
              }}
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={handleTextareaBlur}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={input.length === 0}
            >
              <StepForward size={30} />
            </Button>
          </div>
          <EmptyScreen
            ref={emptyScreenRef}
            submitMessage={(message) => {
              setInput(message);
              inputRef.current?.focus();
            }}
            className={cn(isTextareaFocused ? 'visible' : 'invisible')}
          />
        </form>
      </div>
    </div>
  );
}
