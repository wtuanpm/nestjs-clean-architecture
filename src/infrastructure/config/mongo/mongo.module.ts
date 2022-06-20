import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      
    }),
  ],
})
export class MongoConfigModule {}
