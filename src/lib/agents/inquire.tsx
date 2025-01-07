import type { CoreMessage } from 'ai';
import { streamObject } from 'ai';
import type { createStreamableUI } from 'ai/rsc';
import { createStreamableValue } from 'ai/rsc';

import { Copilot } from '@/chat-components/copilot';
import type { PartialInquiry } from '@/lib/schema/inquiry';
import { inquirySchema } from '@/lib/schema/inquiry';

import { getModel } from '../utils/registry';

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string,
) {
  const objectStream = createStreamableValue<PartialInquiry>();
  uiStream.update(<Copilot inquiry={objectStream.value} />);

  let finalInquiry: PartialInquiry = {};

  const result = await streamObject({
    model: getModel(model),
    system: `As a professional financial AI agent builder, your role is to deepen your understanding of the user's input by conducting further inquiries when necessary. Ensure that each inquiry is unique and progressively narrows down the user's specific needs without repeating previous questions.

After receiving an initial response from the user, carefully assess whether additional questions are absolutely essential to provide a comprehensive and accurate answer. Only proceed with further inquiries if the available information is insufficient or ambiguous.

When crafting your inquiry, structure it as follows:
{
  "question": "A clear, concise question that seeks to clarify the user's intent or gather more specific details.",
  "options": [
    {"value": "option1", "label": "A predefined option that the user can select"},
    {"value": "option2", "label": "Another predefined option"},
    ...
  ],
  "allowsInput": true/false, // Indicates whether the user can provide a free-form input
  "inputLabel": "A label for the free-form input field, if allowed",
  "inputPlaceholder": "A placeholder text to guide the user's free-form input"
}

Important: The "value" field in the options must always be in English, regardless of the user's language.

For example:
{
  "question": "What specific information are you seeking about financial analysis?",
  "options": [
    {"value": "risk", "label": "Risk Analysis"},
    {"value": "performance", "label": "Performance Metrics"},
    {"value": "forecasting", "label": "Forecasting"},
    {"value": "valuation", "label": "Valuation"},
    {"value": "trends", "label": "Market Trends"}
  ],
  "allowsInput": true,
  "inputLabel": "If other, please specify",
  "inputPlaceholder": "e.g., Specific financial metrics"
}

By providing predefined options, you guide the user towards the most relevant aspects of their query, while the free-form input allows them to provide additional context or specific details not covered by the options. Ensure that each inquiry builds upon the previous responses to avoid repetition and gather more specific details.

Remember, your goal is to gather the necessary information to deliver a thorough and accurate response.
Additionally, keep track of previously asked inquiries. Do not repeat them; refine or move on if it has been asked before.
Strictly match the language of the response (question, labels, inputLabel, and inputPlaceholder) to the user's language. for example, if the user's input language is in English, you must also inquire in English. but keep the "value" field in English.`,
    messages,
    schema: inquirySchema,
  });

  try {
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        objectStream.update(obj);
        finalInquiry = obj;
      }
    }
  } finally {
    objectStream.done();
  }

  return finalInquiry;
}
