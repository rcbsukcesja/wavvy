interface Business {
  id: string;
  name: string;
  owners: User[];
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: string[];
  creationDate: string;
  description: string;
  logoUrl: string;
  resource: string[];
}

export interface Company extends Business {
  businessAreas: BusinessArea[];
  donatedProjects: Project[];
  KRS: string;
  NIP: string;
}

export interface Ngo extends Business {
  KRS?: string;
  NIP?: string;
  legalStatus: LegalStatus;
  donors?: Company[];
  employees: User[];
  projects: Project[];
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
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

interface BusinessArea {
  id: string;
  name: string;
}

type UserType = 'NGO' | 'BUSINESS' | 'MAGISTRATE' | 'RESIDENT';

type ProjectStatus =
  | 'IDEA'
  | 'PLANNED'
  | 'OBTAINING_FINANCING'
  | 'IN_PROMOTION'
  | 'IN_PROGRESS'
  | 'IN_SETTLEMENT'
  | 'COMPLETED';

export type LegalStatus = 'FOUNDATION' | 'ASSOCIATION' | 'SOCIAL_COOPERATIVE' | 'PUBLIC_BENEFIT_ORGANIZATION';
