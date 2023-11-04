import { User } from 'src/app/auth/data_access/auth.state.service';
import { Project } from '../../projects/model/project.model';
import { UserData } from 'src/app/auth/models/user.model';
import { ID } from 'src/app/core/types/id.type';

export interface BusinessArea {
  name: string;
  id: ID;
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

export const NgoStatus = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
} as const;

export interface NGO {
  id: ID;
  name: string;
  logoUrl: string;
  owner: UserData;
  address: string;
  phone: string;
  email: string;
  website: string;
  creationDate: string;
  description: string;
  businnessAreas: number[];
  bankAccount?: string;
  KRS: string;
  NIP: string;
  REGON: string;
  resources: string[];
  legalStatus: LegalStatusNGO;
  projects: Project[];
  tags: string[];
  status: keyof typeof NgoStatus;
}
