import { Injectable } from '@angular/core';
import { HttpBaseService } from '../core/http-base.abstract.service';
import { BusinessArea } from '../features/ngo/model/ngo.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessAreaApiService extends HttpBaseService {
  constructor() {
    super('bussinessAreas');
  }

  getAll() {
    return this.http.get<BusinessArea[]>(this.url);
  }
}
