import type { CoreMessage } from 'ai';
import { generateObject } from 'ai';

import { nextActionSchema } from '../schema/next-action';
import { getModel } from '../utils/registry';

// Decide whether inquiry is required for the user input
export async function taskManager(messages: CoreMessage[], model: string) {
  try {
    const result = await generateObject({
      model: getModel(model),
      system: `As a professional financial AI agent builder, your primary objective is to fully comprehend the user's query and determine the optimal course of action. You have one option at your disposal:

 1. "inquire": If you believe that additional information from the user would enhance your ability to provide a comprehensive response, select this option but you are strictly limited to a maximum of 3 inquiries. You may present a form to the user, offering default selections or free-form input fields, to gather the required details.
2. "proceed": Only if already at least 1 inquire is done and the provided information is sufficient to address the query effectively, choose this option to proceed with the research and formulate a response.
Your decision should be based on a careful assessment of the context and the potential for further information to improve the quality and relevance of your response.
For example, if the user asks, "What's the best financial analysis tool for my needs?", you may opt to "inquire" and present a form asking about their specific requirements, budget, and preferred features to provide a more tailored recommendation.
Make your choice wisely to ensure that you fulfill your mission as a financial AI agent builder effectively and deliver the most valuable assistance to the user.`,
      messages,
      schema: nextActionSchema,
    });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
