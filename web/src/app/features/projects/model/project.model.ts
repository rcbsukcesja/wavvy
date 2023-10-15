import { ID } from 'src/app/core/types/id.type';
import { BusinessArea } from '../../ngo/model/ngo.model';

export const PROJECT_STATUS = {
  IDEA: 'IDEA',
  PLANNED: 'PLANNED',
  OBTAINING_FINANCING: 'OBTAINING_FINANCING',
  IN_SETTLEMENT: 'IN_SETTLEMENT',
  IN_PROMOTION: 'IN_PROMOTION',
  IN_PROGRESS: 'IN_SETTLEMENT',
  COMPLETED: 'COMPLETED',
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUS;

export type ProjectStatusMap = {
  [K in ProjectStatus]: string;
};

export const projectStatusMap: ProjectStatusMap = {
  IDEA: 'Pomysł',
  PLANNED: 'Planowanie',
  OBTAINING_FINANCING: 'Pozyskiwanie finansowania',
  IN_SETTLEMENT: 'W trakcie rozliczania',
  IN_PROMOTION: 'W trakcie promocji',
  IN_PROGRESS: 'W trakcie realizacji',
  COMPLETED: 'Zakończony',
};

export interface Project {
  id: ID;
  name: string;
  description: string;
  startTime: string;
  address: string;
  endTime: string;
  ngo: string;
  ngoid: ID;
  budget: number;
  status: ProjectStatus;
  tags: string[];
  imageLink: string;
  link: string;
  cooperationMessage?: string;
  possibleVolunteer: boolean;
  categories: BusinessArea[];
}

export interface NGOProject extends Project {
  ngoid: ID;
  ngoName: string;
}
