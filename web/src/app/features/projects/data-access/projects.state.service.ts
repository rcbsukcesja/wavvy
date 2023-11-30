import { Injectable } from '@angular/core';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';
import { Project } from '../model/project.model';
import { Pagination } from 'src/app/core/types/list-response.type';

export const INITIAL_PAGINATION_STATE: Pagination = {
  empty: true,
  last: false,
  number: 0,
  numberOfElements: 0,
  size: 6,
  totalElements: 0,
  totalPages: 0,
};

export interface ProjectsStateValue {
  list: Project[];
  loadListCallState: CallState;
  totalElements: number;
}

const initialState: ProjectsStateValue = {
  list: [],
  totalElements: 0,
  loadListCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class ProjectsStateService extends StateService<ProjectsStateValue> {
  constructor() {
    super(initialState);
  }
}
