import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})

export class FormatDatePipe implements PipeTransform {
  transform(date: any[], format: string): any {
    if(format) {
        return moment(date).format(format);
    } 
    return moment(date).format('YYYY/MM/DDDD');
  }
}