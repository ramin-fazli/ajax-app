'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/chat-components/ui/alert-dialog';
import { Button } from '@/chat-components/ui/button';
import { Spinner } from '@/chat-components/ui/spinner';
import { clearChats } from '@/lib/actions/chat';

type ClearHistoryProps = {
  userId: string;
  empty: boolean;
};

export function ClearHistory({ userId, empty }: ClearHistoryProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex justify-center">
          <Button variant="outline" className="w-auto" disabled={empty}>
            Clear History
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            history and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              startTransition(async () => {
                const result = await clearChats(userId);
                if (result?.error) {
                  toast.error(result.error);
                } else {
                  toast.success('History cleared');
                }
                setOpen(false);
              });
            }}
          >
            {isPending ? <Spinner /> : 'Clear'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
