import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id?: string;

  @Prop({ unique: true, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
