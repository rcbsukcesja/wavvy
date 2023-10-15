import { Injectable, signal } from '@angular/core';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';
import { Project } from '../model/project.model';

export interface ProjectsStateValue {
  list: Project[];
  loadListCallState: CallState;
}

const initialState: ProjectsStateValue = {
  list: [],
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
