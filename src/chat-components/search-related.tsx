'use client';

import type {
  StreamableValue,
} from 'ai/rsc';
import {
  useActions,
  useStreamableValue,
  useUIState,
} from 'ai/rsc';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import type { AI } from '@/app/[locale]/(auth)/(main)/(dashboard)/dashboard/actions';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import type { PartialRelated } from '@/lib/schema/related';
import { models } from '@/lib/types/models';
import { getDefaultModelId } from '@/lib/utils';

import { Section } from './section';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { UserMessage } from './user-message';

export type SearchRelatedProps = {
  relatedQueries: StreamableValue<PartialRelated>;
};

export const SearchRelated: React.FC<SearchRelatedProps> = ({
  relatedQueries,
}) => {
  const { submit } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const [data, error] = useStreamableValue(relatedQueries);
  const [related, setRelated] = useState<PartialRelated>();

  const [selectedModelId] = useLocalStorage<string>(
    'selectedModel',
    getDefaultModelId(models),
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    setRelated(data);
  }, [data]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // Get the submitter of the form
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLInputElement;
    let query = '';
    if (submitter) {
      formData.append(submitter.name, submitter.value);
      query = submitter.value;
    }

    // Add model information to formData
    formData.set('model', selectedModelId);

    const userMessage = {
      id: Date.now(),
      component: <UserMessage message={query} />,
    };

    const responseMessage = await submit(formData);
    setMessages(currentMessages => [
      ...currentMessages,
      userMessage,
      responseMessage,
    ]);
  };

  return related
    ? (
        <Section title="Related" separator>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            {Array.isArray(related.items)
              ? (
                  related.items
                    ?.filter(item => item?.query !== '')
                    .map(item => (
                      <div className="flex w-full items-start" key={`related-${item?.query}`}>
                        <ArrowRight className="mr-2 mt-1 size-4 shrink-0 text-accent-foreground/50" />
                        <Button
                          variant="link"
                          className="h-fit flex-1 justify-start whitespace-normal px-0 py-1 text-left font-semibold text-accent-foreground/50"
                          type="submit"
                          name="related_query"
                          value={item?.query}
                        >
                          {item?.query}
                        </Button>
                      </div>
                    ))
                )
              : (
                  <div>Not an array</div>
                )}
          </form>
        </Section>
      )
    : error
      ? null
      : (
          <Section title="Related" separator>
            <Skeleton className="h-6 w-full" />
          </Section>
        );
};

export default SearchRelated;
