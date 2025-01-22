import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  projectName: string;

  @Prop()
  clientName: string;

  @Prop()
  image: string;

  @Prop([String])
  tags: string[];

  @Prop()
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(Project);
