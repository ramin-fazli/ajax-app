'use client';

import type { StreamableValue } from 'ai/rsc';
import { useStreamableValue } from 'ai/rsc';

import type { SerperSearchResults } from '@/lib/types';

import { DefaultSkeleton } from './default-skeleton';
import { Section } from './section';
import { ToolBadge } from './tool-badge';
import { VideoSearchResults } from './video-search-results';

export type VideoSearchSectionProps = {
  result?: StreamableValue<string>;
};

export function VideoSearchSection({ result }: VideoSearchSectionProps) {
  const [data, error, pending] = useStreamableValue(result);
  const searchResults: SerperSearchResults = data ? JSON.parse(data) : undefined;
  return (
    <div>
      {!pending && data
        ? (
            <>
              <Section size="sm" className="pb-0 pt-2">
                <ToolBadge tool="search">{`${searchResults.searchParameters.q}`}</ToolBadge>
              </Section>
              <Section title="Videos">
                <VideoSearchResults results={searchResults} />
              </Section>
            </>
          )
        : (
            <Section className="pb-0 pt-2">
              <DefaultSkeleton />
            </Section>
          )}
    </div>
  );
}
