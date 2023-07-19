import { Injectable, signal } from '@angular/core';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';
import { Project } from '../model/project.model';

export interface ProjectsStateValue {
  list: Project[];
  listByNGOId: Project[];
  loadListCallState: CallState;
  loadListByNGOIdCallState: CallState;
}

const initialState: ProjectsStateValue = {
  list: [],
  listByNGOId: [],
  loadListCallState: 'INITIAL',
  loadListByNGOIdCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class ProjectsStateService extends StateService<ProjectsStateValue> {
  constructor() {
    super(initialState);
  }
}
