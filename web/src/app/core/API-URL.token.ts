import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken('API_URL', {
  factory() {
    // from .env
    return 'http://localhost:3000';
  },
});
