import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProblemsDate',
})
export class SortProblemsDatePipe implements PipeTransform {
  transform(dates: string[]): string[] {
    return dates.sort((a, b) => {
      return parseInt(b, 10) - parseInt(a, 10);
    });
  }
}
