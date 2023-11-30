import { Injectable } from '@angular/core';
import { HttpBaseService } from '../core/http-base.abstract.service';
import { BusinessArea } from '../features/ngo/model/ngo.model';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessAreaApiService extends HttpBaseService {
  constructor() {
    super('business-areas');
  }

  getAll() {
    return this.http.get<BusinessArea[]>(this.url).pipe(
      map(areas => areas.slice(0, 9)),
      tap(console.log)
    );

    return of([
      {
        id: 1,
        name: 'Sport i zdrowie',
      },
      {
        id: 2,
        name: 'Kultura',
      },
      { id: 2, name: 'Edukacja i wychowanie' },
      {
        id: 4,
        name: 'Promocja i ochrona praw zwierząt',
      },
      {
        id: 5,
        name: 'Pomoc humanitarna i rozwój międzynarodowy',
      },
      {
        id: 6,
        name: 'Wsparcie dla osób starszych',
      },
      {
        id: 7,
        name: 'Rozwój społeczności lokalnych',
      },
      {
        id: 8,
        name: 'Ochrona środowiska',
      },
      {
        id: 9,
        name: 'Zdrowie i opieka społeczna',
      },
    ]);
  }
}
