import { User } from 'src/app/auth/data_access/auth.state.service';
import { Project } from '../../projects/model/project.model';
import { UserData } from 'src/app/auth/models/user.model';

export interface BusinessArea {
  name: string;
  id: number;
}

export type LegalStatusNGO = 'FOUNDATION' | 'ASSOCIATION' | 'SOCIAL_COOPERATIVE' | 'PUBLIC_BENEFIT_ORGANIZATION';

export type LegalStatusMap = {
  [K in LegalStatusNGO]: string;
};

export const legalStatusMap: LegalStatusMap = {
  FOUNDATION: 'Fundacja',
  ASSOCIATION: 'Stowarzyszenie',
  SOCIAL_COOPERATIVE: 'Spółdzielnia socjalna',
  PUBLIC_BENEFIT_ORGANIZATION: 'Organizacja Pożytku Publicznego',
};

export interface NGO {
  id: string;
  name: string;
  logo: string;
  owners: UserData[];
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: string[];
  creationDate: string;
  description: string;
  businnessAreas: BusinessArea[];
  KRS: string;
  NIP: string;
  resources: string[];
  legalStatus: LegalStatusNGO;
  // donors: Company[];
  employees: UserData[];
  projects: Project[];
  tags: string[];
}
