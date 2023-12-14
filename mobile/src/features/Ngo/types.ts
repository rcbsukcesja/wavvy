import { Business } from 'src/shared/types';

import { CompanyDTO } from '../Company/types';

export interface NgoDTO extends Business {
  krs?: string;
  nip?: string;
  legalStatus: LegalStatus;
  donors?: CompanyDTO[];
}

export type LegalStatus = 'FOUNDATION' | 'ASSOCIATION' | 'SOCIAL_COOPERATIVE' | 'PUBLIC_BENEFIT_ORGANIZATION';
