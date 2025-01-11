import type { CoreMessage } from 'ai';
import { generateObject } from 'ai';

import { agentCreatorSchema } from '../schema/agent-creator';
import { getModel } from '../utils/registry';

// Decide whether inquiry is required for the user input
export async function agentCreator(messages: CoreMessage[], model: string) {
  try {
    const result = await generateObject({
      model: getModel(model),
      system: `As a professional financial AI agent builder, your main goal is to thoroughly understand the user's query and identify which of the following agentflow templates best meets the user's needs. Consider the user's specific requirements and context to select the most suitable template. Then write the template's number as the output:
0. Credit Risk Analysis Template
0. Financial Analysis Template
0. Investment Management Template
0. Stock Research Template
0. Business Intelligence Template

Your decision should be based on a careful assessment of the user's needs, ensuring that the selected template will provide the most optimal solution for their financial AI agent workflow.`,
      messages,
      schema: agentCreatorSchema,
    });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
