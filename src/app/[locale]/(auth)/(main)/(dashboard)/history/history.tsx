'use client';

import { ChevronLeft, History as HistoryIcon, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useTransition } from 'react';

import { Button } from '@/chat-components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/chat-components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAppState } from '@/lib/utils/app-state';

import { HistorySkeleton } from './history-skeleton';

type HistoryProps = {
  location: 'sidebar' | 'header';
  children?: React.ReactNode;
};

export function History({ location, children }: HistoryProps) {
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const { isGenerating } = useAppState();

  const onOpenChange = (open: boolean) => {
    if (open) {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn({
            'rounded-full text-foreground/30': location === 'sidebar',
          })}
          disabled={isGenerating}
        >
          {location === 'header' ? <Menu /> : <ChevronLeft size={16} />}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64 rounded-l-xl">
        <SheetHeader>
          <SheetTitle className="mb-2 flex items-center gap-1 text-sm font-normal">
            <HistoryIcon size={14} />
            History
          </SheetTitle>
        </SheetHeader>
        <div className="my-2 h-full pb-12 md:pb-10">
          <Suspense fallback={<HistorySkeleton />}>{children}</Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}
