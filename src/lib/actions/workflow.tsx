'use server';

import type { CoreMessage } from 'ai';
import { generateId } from 'ai';
import type { createStreamableUI, createStreamableValue } from 'ai/rsc';
import React from 'react';

import { FollowupPanel } from '@/chat-components/followup-panel';
import { Section } from '@/chat-components/section';
import { Spinner } from '@/chat-components/ui/spinner';
import {
  agentCreator,
  inquire,
  researcher,
  researcherWithOllama,
  taskManager,
} from '@/lib/agents';

export async function workflow(
  uiState: {
    uiStream: ReturnType<typeof createStreamableUI>;
    isCollapsed: ReturnType<typeof createStreamableValue>;
    isGenerating: ReturnType<typeof createStreamableValue>;
  },
  aiState: any,
  messages: CoreMessage[],
  skip: boolean,
  model: string,
) {
  const { uiStream, isCollapsed, isGenerating } = uiState;
  const id = generateId();

  // Display spinner
  uiStream.append(<Spinner />);

  type ActionResult = { object: { next?: 'proceed' | 'inquire' } };
  let action: ActionResult = { object: { next: 'proceed' } };
  // If the user does not skip the task, run the task manager
  if (!skip) {
    action = (await taskManager(messages, model) as ActionResult) ?? action;
  }

  if (action.object.next === 'inquire') {
    // Generate inquiry
    const inquiry = await inquire(uiStream, messages, model);
    uiStream.done();
    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: generateId(),
          role: 'assistant',
          content: `inquiry: ${inquiry?.question}`,
          type: 'inquiry',
        },
      ],
    });

    isCollapsed.done(false);
    isGenerating.done(false);
    return;
  }

  // Set the collapsed state to true
  isCollapsed.done(true);

  // Remove the spinner
  uiStream.update(null);

  // Get agentCreator's output and Add Canvas panel
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  const agentServerUrl = (environment === 'production'
    ? process.env.NEXT_PUBLIC_AGENT_SERVER_URL
    : process.env.NEXT_PUBLIC_AGENT_SERVER_URL_DEV) || 'https://agent.tryajax.com';

  const agentCreatorResult = await agentCreator(messages, model);
  const agentCreatorOutput = agentCreatorResult?.object?.TemplateID || '0';
  /*   if (agentCreatorOutput) {
    uiStream.append(<CanvasSection
      agentServerUrl={agentServerUrl}
      TemplateID={agentCreatorOutput}
    />);
  } */

  const useOllama = model.startsWith('ollama');
  // Select the appropriate researcher function based on the environment variables
  const { text, toolResults } = useOllama
    ? await researcherWithOllama(uiStream, messages, model)
    : await researcher(uiStream, messages, model, agentServerUrl, agentCreatorOutput);

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      ...toolResults.map((toolResult: any) => ({
        id,
        role: 'tool',
        content: JSON.stringify(toolResult.result),
        name: toolResult.toolName,
        type: 'tool',
      })),
      {
        id,
        role: 'assistant',
        content: agentCreatorOutput,
        type: 'agentCreator',
      },
      {
        id,
        role: 'assistant',
        content: text,
        type: 'answer',
      },

    ],
  });

  const messagesWithAnswer: CoreMessage[] = [
    ...messages,
    {
      role: 'assistant',
      content: text,
    },
  ];

  // Generate related queries
  /*   const relatedQueries = await querySuggestor(
    uiStream,
    messagesWithAnswer,
    model
  ) */
  // Add follow-up panel
  uiStream.append(
    <Section title="Refine">
      <FollowupPanel />
    </Section>,
  );

  uiStream.done();
  isGenerating.done(false);

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      /*       {
        id,
        role: 'assistant',
        content: JSON.stringify(relatedQueries),
        type: 'related'
      }, */
      {
        id,
        role: 'assistant',
        content: 'followup',
        type: 'followup',
      },
    ],
  });
}
