import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { MongoConfigModule } from '../config/mongo/mongo.module';
import { User, UserSchema } from '../schemas/user.schema';

import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    MongoConfigModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', () => {});
        },
      },
    ]),
  ],

  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
