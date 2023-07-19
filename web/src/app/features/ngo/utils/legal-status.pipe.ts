import { Pipe, PipeTransform } from '@angular/core';
import { LegalStatusNGO, legalStatusMap } from '../model/ngo.model';

@Pipe({
  name: 'legalStatus',
  standalone: true,
})
export class LegalStatusPipe implements PipeTransform {
  transform(status: LegalStatusNGO) {
    return legalStatusMap[status];
  }
}
