import { z } from 'zod';

const descriptionSchema = z.object({
  time: z.number(),
  version: z.string(),
  blocks: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      data: z.object({ level: z.number().optional(), text: z.string() }),
    }),
  ),
});

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  clientName: z.string(),
  image: z.string(),
  tags: z.string().array(),
  description: descriptionSchema,
});

export type LoginDto = z.infer<typeof CreateProjectSchema>;
