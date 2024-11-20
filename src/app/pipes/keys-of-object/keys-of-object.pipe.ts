import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysOfObject',
  standalone: true,
})
export class KeysOfObjectPipe implements PipeTransform {
  transform(object: any = []): any {
    return Object.keys(object);
  }
}
