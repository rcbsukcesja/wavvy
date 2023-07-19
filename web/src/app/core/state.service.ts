import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export abstract class StateService<T> {
  private $state: WritableSignal<T>;

  constructor(initialState: T) {
    this.$state = signal(initialState);
  }

  get $value() {
    return this.$state.asReadonly();
  }

  get value$() {
    return toObservable(this.$state);
  }

  setState(value: Partial<T>) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
