import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: string;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.String,
  })
  username: string;

  @Prop({
    type: mongoose.Schema.Types.String,
  })
  password: string;


  @Prop({
    type: mongoose.Schema.Types.Boolean,
    default: false,
  })
  verified: boolean;

  @Prop({
    type: mongoose.Schema.Types.Date,
    name: 'dob',
  })
  dob: Date;

  @Prop({
    type: mongoose.Schema.Types.String,
    name: 'address',
  })
  address: string;


  @Prop({
    name: 'created_date',
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  })
  createdDate: Date;

  @Prop({
    name: 'created_date',
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  })
  updatedDate: Date;

  @Prop({ name: 'last_login' })
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
