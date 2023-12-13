import { AppUser, Business } from 'src/shared/types';

export interface CompanyDTO extends Business {
  businessAreas: BusinessArea[];
  donatedProjects: Project[];
  krs: string;
  nip: string;
  employees: AppUser[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  address: string;
  imageLink: string;
  link: string;
  startTime: string;
  endTime: string;
  budget: number;
  cooperationMessage: string;
  place: string;
  categories: BusinessArea[];
  status: ProjectStatus;
  tags: string[];
  possibleVolunteer: boolean;
}

export interface BusinessArea {
  id: string;
  name: string;
}

type ProjectStatus =
  | 'IDEA'
  | 'PLANNED'
  | 'OBTAINING_FINANCING'
  | 'IN_PROMOTION'
  | 'IN_PROGRESS'
  | 'IN_SETTLEMENT'
  | 'COMPLETED';
