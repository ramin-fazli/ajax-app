import React from 'react';

import { Skeleton } from '@/chat-components/ui/skeleton';

export function HistorySkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-1.5 overflow-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={`skeleton-${i}`} className="h-12 w-full rounded" />
      ))}
    </div>
  );
}
