import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Description } from './project.interface';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop()
  projectName: string;

  @Prop()
  clientName: string;

  @Prop()
  image: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Object })
  description: Description;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
