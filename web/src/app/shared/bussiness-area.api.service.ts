import { Injectable } from '@angular/core';
import { HttpBaseService } from '../core/http-base.abstract.service';
import { BusinessArea } from '../features/ngo/model/ngo.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessAreaApiService extends HttpBaseService {
  constructor() {
    super('business-areas');
  }

  getAll() {
    return this.http.get<BusinessArea[]>(this.url).pipe(map(areas => areas.slice(0, 9)));
  }
}
