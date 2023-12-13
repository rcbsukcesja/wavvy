import { Theme } from '../types';

export type StylesGenerator<T extends object> = (theme: Theme) => T;
