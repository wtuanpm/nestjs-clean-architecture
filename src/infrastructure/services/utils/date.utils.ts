import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as ms from 'ms';

@Injectable()
export class DateUtils {
  constructor() {}

  getDateFromDurationString(duration: string) {
    try {
      const result = moment().add('milliseconds', ms(duration)).toDate();
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
