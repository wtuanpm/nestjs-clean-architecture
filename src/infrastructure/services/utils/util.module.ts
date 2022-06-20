import { Module } from '@nestjs/common';
import { DateUtils } from './date.utils';

@Module({
  providers: [DateUtils],
  exports: [DateUtils],
})
export class UtilsModule {}
