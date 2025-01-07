import type { CoreMessage } from 'ai';
import { generateText, streamText } from 'ai';
import type { createStreamableUI } from 'ai/rsc';
import { createStreamableValue } from 'ai/rsc';

import { AnswerSection } from '@/chat-components/answer-section';
import { CanvasSection } from '@/chat-components/canvas-section';

import { getModel } from '../utils/registry';
import { getTools } from './tools';

const SYSTEM_PROMPT = `As a professional financial AI agent builder, you possess the ability to search for any information on the web.
For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
Your task is to generate a comprehensive but concise text-only instruction to help the user modify and optimize the suggested agentflow template using the search results.
Never start with the instruction with "Okay," and aim to directly address the user's financial agentic AI workflow needs, augmenting your response with insights gleaned from the search results, and provide actionable steps for improving the agentflow.
Note: Never, Never start with the text "Okay, ..."!`;

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string,
  agentServerUrl: string,
  agentCreatorOutput: string,
) {
  try {
    let fullResponse = '';
    const streamableText = createStreamableValue<string>();
    let toolResults: any[] = [];

    const currentDate = new Date().toLocaleString();
    const result = await streamText({
      model: getModel(model),
      system: `${SYSTEM_PROMPT} Current date and time: ${currentDate}`,
      messages,
      tools: getTools({
        uiStream,
        fullResponse,
      }),
      maxSteps: 5,
      onStepFinish: async (event) => {
        if (event.stepType === 'initial') {
          if (event.toolCalls && event.toolCalls.length > 0) {
            uiStream.append(
              <>
                <CanvasSection
                  agentServerUrl={agentServerUrl}
                  TemplateID={agentCreatorOutput}
                />
                <AnswerSection result={streamableText.value} />
              </>,
            );
            toolResults = event.toolResults;
          } else {
            uiStream.append(
              <>
                <CanvasSection
                  agentServerUrl={agentServerUrl}
                  TemplateID={agentCreatorOutput}
                />
                <AnswerSection result={streamableText.value} />
              </>,
            );
          }
        }
      },
    });

    for await (const delta of result.fullStream) {
      if (delta.type === 'text-delta' && delta.textDelta) {
        fullResponse += delta.textDelta;
        streamableText.update(fullResponse);
      }
    }

    streamableText.done(fullResponse);

    return { text: fullResponse, toolResults };
  } catch (error) {
    console.error('Error in researcher:', error);
    return {
      text: 'An error has occurred. Please try again.',
      toolResults: [],
    };
  }
}

export async function researcherWithOllama(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string,
) {
  try {
    const fullResponse = '';
    const streamableText = createStreamableValue<string>();
    let toolResults: any[] = [];

    const currentDate = new Date().toLocaleString();
    const result = await generateText({
      model: getModel(model),
      system: `${SYSTEM_PROMPT} Current date and time: ${currentDate}`,
      messages,
      tools: getTools({
        uiStream,
        fullResponse,
      }),
      maxSteps: 5,
      onStepFinish: async (event) => {
        if (event.stepType === 'initial') {
          if (event.toolCalls) {
            uiStream.append(<AnswerSection result={streamableText.value} />);
            toolResults = event.toolResults;
          } else {
            uiStream.append(<AnswerSection result={streamableText.value} />);
          }
        }
      },
    });

    streamableText.done(result.text);

    return { text: result.text, toolResults };
  } catch (error) {
    console.error('Error in researcherWithOllama:', error);
    return {
      text: 'An error has occurred. Please try again.',
      toolResults: [],
    };
  }
}
