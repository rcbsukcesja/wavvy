import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus, projectStatusMap } from '../model/project.model';

@Pipe({
  name: 'projectStatus',
  standalone: true,
})
export class ProjectStatusPipe implements PipeTransform {
  transform(status: ProjectStatus) {
    return projectStatusMap[status];
  }
}
