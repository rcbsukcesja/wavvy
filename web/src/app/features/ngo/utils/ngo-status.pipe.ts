import { Pipe, PipeTransform } from '@angular/core';
import { NgoStatus } from '../model/ngo.model';

@Pipe({
  name: 'ngoStatus',
  standalone: true,
})
export class NgoStatusPipe implements PipeTransform {
  transform(status: keyof typeof NgoStatus) {
    return NgoStatus[status];
  }
}
