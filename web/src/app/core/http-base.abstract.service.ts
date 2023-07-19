import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class HttpBaseService {
  protected http = inject(HttpClient);
  protected readonly API_URL = 'http://localhost:3000';

  constructor(private readonly rootUrl: string) {}

  get url() {
    return `${this.API_URL}/${this.rootUrl}`;
  }
}
