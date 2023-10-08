import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL } from './API-URL.token';

export abstract class HttpBaseService {
  protected http = inject(HttpClient);
  protected readonly API_URL = inject(API_URL);

  constructor(private readonly rootUrl: string) {}

  get url() {
    return `${this.API_URL}/${this.rootUrl}`;
  }
}
