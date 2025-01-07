'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AI, UIState } from '@/app/[locale]/(auth)/(main)/(dashboard)/(app)/actions'
import { useUIState, useActions, useAIState } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { UserMessage } from './user-message'
import { Button } from './ui/button'
import { ArrowRight, StepForward, Plus, RotateCcw } from 'lucide-react'
import { EmptyScreen } from './empty-screen'
import Textarea from 'react-textarea-autosize'
import { generateId } from 'ai'
import { useAppState } from '@/lib/utils/app-state'
import { ModelSelector } from './model-selector'
import { models } from '@/lib/types/models'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { getDefaultModelId } from '@/lib/utils'
import { toast } from 'sonner'
import { TypingText} from '@/chat-components/ui/typewriter'

interface ChatPanelProps {
  messages: UIState
  query?: string
  onModelChange?: (id: string) => void
}

export function ChatPanel({ messages, query, onModelChange }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [showEmptyScreen, setShowEmptyScreen] = useState(true)
  const [, setMessages] = useUIState<typeof AI>()
  const [aiMessage, setAIMessage] = useAIState<typeof AI>()
  const { isGenerating, setIsGenerating } = useAppState()
  const { submit } = useActions()
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true) // For development environment

  const [selectedModelId, setSelectedModelId] = useLocalStorage<string>(
    'selectedModel',
    getDefaultModelId(models)
  )

  const [isComposing, setIsComposing] = useState(false) // Composition state
  const [enterDisabled, setEnterDisabled] = useState(false) // Disable Enter after composition ends
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)
  const emptyScreenRef = useRef<HTMLDivElement>(null)

  const handleCompositionStart = () => setIsComposing(true)

  const handleCompositionEnd = () => {
    setIsComposing(false)
    setEnterDisabled(true)
    setTimeout(() => {
      setEnterDisabled(false)
    }, 300)
  }

  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Check if the related target is inside EmptyScreen
    const relatedTarget = e.relatedTarget as Node
    if (emptyScreenRef.current && emptyScreenRef.current.contains(relatedTarget)) {
      return
    }
    setIsTextareaFocused(false)
  }

  async function handleQuerySubmit(query: string, formData?: FormData) {
    setInput(query)
    setIsGenerating(true)

    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: generateId(),
        component: <UserMessage message={query} />
      }
    ])

    // Use existing formData or create new one
    const data = formData || new FormData()

    // Add or update the model information
    const modelString = selectedModelId
    data.set('model', modelString)

    // Add or update the input query if not already present
    if (!formData) {
      data.set('input', query)
    }

    const responseMessage = await submit(data)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      await handleQuerySubmit(input, formData)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(`${error}`)

      handleClear()
    }
  }

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      handleQuerySubmit(query)
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    const lastMessage = aiMessage.messages.slice(-1)[0]
    if (lastMessage?.type === 'followup' || lastMessage?.type === 'inquiry') {
      setIsGenerating(false)
    }
  }, [aiMessage, setIsGenerating])

  // Clear messages
  const handleClear = () => {
    setIsGenerating(false)
    setMessages([])
    setAIMessage({ messages: [], chatId: '' })
    setInput('')
    router.push('/')
  }

  useEffect(() => {
    setShowEmptyScreen(input.trim().length === 0)
  }, [input])

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0) {
    return (
      <div className="fixed bottom-2 md:bottom-8 left-0 right-0 flex justify-center items-center mx-auto pointer-events-none">
        <Button
          type="button"
          variant={'secondary'}
          className="rounded-full bg-secondary/80 group transition-all hover:scale-105 pointer-events-auto"
          onClick={() => handleClear()}
          disabled={isGenerating}
        >
          <span className="text-sm mr-2 group-hover:block hidden animate-in fade-in duration-300">
            Start Over
          </span>
          <RotateCcw size={18} className="group-hover:rotate-90 transition-all" />
        </Button>
      </div>
    )
  }

  if (query && query.trim().length > 0) {
    return null
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl mt-6 mb-6 mx-auto my-auto">
        <TypingText strings={["<strong>Let's build your agentic AI workflow.</strong>"]} typeSpeed={50} loop={false} />
      </div>
    <div className="fixed bottom-8 left-0 right-0 top-10 mx-auto h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full px-6">
        <div className="relative flex items-center w-full">
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
            className="resize-none w-full min-h-20 -fill bg-muted border border-input pl-4 pr-10 pt-3 pb-1 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={e => {
              setInput(e.target.value)
            }}
            onKeyDown={e => {
              // Enter should submit the form, but disable it right after IME input confirmation
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !isComposing && // Not in composition
                !enterDisabled // Not within the delay after confirmation
              ) {
                // Prevent the default action to avoid adding a new line
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onHeightChange={height => {
              // Ensure inputRef.current is defined
              if (!inputRef.current) return

              // The initial height and left padding is 70px and 2rem
              const initialHeight = 70
              // The initial border radius is 32px
              const initialBorder = 32
              // The height is incremented by multiples of 20px
              const multiple = (height - initialHeight) / 20

              // Decrease the border radius by 4px for each 20px height increase
              const newBorder = initialBorder - 4 * multiple
              // The lowest border radius will be 8px
              inputRef.current.style.borderRadius =
                Math.max(8, newBorder) + 'px'
            }}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={handleTextareaBlur}
          />
          <Button
            type="submit"
            size={'icon'}
            variant={'ghost'}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={input.length === 0}
          >
            <StepForward size={30} />
          </Button>
        </div>
        <EmptyScreen
          ref={emptyScreenRef}
          submitMessage={message => {
            setInput(message)
            inputRef.current?.focus()
          }}
          className={cn(isTextareaFocused ? 'visible' : 'invisible')}
        />
      </form>
    </div>
    </div>
  )
}
