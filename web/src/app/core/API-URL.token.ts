import { InjectionToken } from '@angular/core';
import { environment } from 'src/environment';

export const API_URL = new InjectionToken('API_URL', {
  factory() {
    return environment.API_URL;
  },
});
