import { z } from 'zod';

// Define the schema for CheckListItem
const CheckListItemSchema = z.object({
  text: z.string(),
  checked: z.boolean(),
});

// Define the schema for ListItem
const ListItemSchema = z.object({
  content: z.string(),
  meta: z.record(z.unknown()),
  items: z.array(z.lazy(() => ListItemSchema)), // Nested ListItem
});

// Define the schema for BlockData
const BlockDataSchema = z.object({
  text: z.string().optional(),
  level: z.number().optional(),
  items: z.array(z.union([CheckListItemSchema, ListItemSchema])).optional(),
  style: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
  counterType: z.string().optional(),
  content: z.string().optional(),
  caption: z.string().optional(),
  alignment: z.string().optional(),
});

// Define the schema for Block
const BlockSchema = z.object({
  id: z.string(),
  type: z.enum(['header', 'paragraph', 'checkList', 'list', 'quote']),
  data: BlockDataSchema,
});

// Define the schema for Document
const descriptionSchema = z.object({
  time: z.number(),
  blocks: z.array(BlockSchema),
  version: z.string(),
});

export const CreateProjectSchema = z.object({
  projectName: z.string(),
  clientName: z.string(),
  image: z.string(),
  tags: z.string().array(),
  description: descriptionSchema,
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export type LoginDto = z.infer<typeof CreateProjectSchema>;
