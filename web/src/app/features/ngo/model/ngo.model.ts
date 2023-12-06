import { Address, Project } from '../../projects/model/project.model';
import { UserData } from 'src/app/auth/models/user.model';
import { ID } from 'src/app/core/types/id.type';

export interface BusinessArea {
  name: string;
  id: string;
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
  id: string;
  name: string;
  logoUrl: string;
  owner: UserData;
  address: Address | null;
  phone: string;
  email: string;
  website: string;
  foundedAt: string;
  description: string;
  businessAreas: string[];
  bankAccount?: string;
  krs: string;
  nip: string;
  regon: string;
  resources: string[];
  legalStatus: LegalStatusNGO;
  projects: Project[];
  tags: string[];
  status: keyof typeof NgoStatus;
  disabled: boolean;
  reason?: string;
  confirmed: true;
}
