import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app-state.model';

export function useStore() {
  return inject<Store<AppState>>(Store);
}
