import type { DeepPartial } from 'ai';
import { z } from 'zod';

export const agentCreatorSchema = z.object({
  TemplateID: z.string().regex(/^\d+$/), // any number as a string
});

export type agentCreatorOutput = DeepPartial<typeof agentCreatorSchema>;
