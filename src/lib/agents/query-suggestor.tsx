import type { CoreMessage } from 'ai';
import { streamObject } from 'ai';
import type { createStreamableUI } from 'ai/rsc';
import { createStreamableValue } from 'ai/rsc';

import SearchRelated from '@/chat-components/search-related';
import type { PartialRelated } from '@/lib/schema/related';
import { relatedSchema } from '@/lib/schema/related';

import { getModel } from '../utils/registry';

export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string,
) {
  const objectStream = createStreamableValue<PartialRelated>();
  uiStream.append(<SearchRelated relatedQueries={objectStream.value} />);

  const lastMessages = messages.slice(-1).map((message) => {
    return {
      ...message,
      role: 'user',
    };
  }) as CoreMessage[];

  let finalRelatedQueries: PartialRelated = {};
  const result = await streamObject({
    model: getModel(model),
    system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    Please match the language of the response to the user's language.`,
    messages: lastMessages,
    schema: relatedSchema,
  });

  for await (const obj of result.partialObjectStream) {
    if (obj.items) {
      objectStream.update(obj);
      finalRelatedQueries = obj;
    }
  }

  return finalRelatedQueries;
}
