import { User } from 'src/app/auth/data_access/auth.state.service';
import { BusinessArea, NgoStatus } from '../../ngo/model/ngo.model';
import { Project } from '../../projects/model/project.model';
import { ID } from 'src/app/core/types/id.type';

export interface Company {
  id: ID;
  name: string;
  owners: User[];
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
  resource: string[];
  donatedProjects: Project[];
  status: keyof typeof NgoStatus;
  disabled: boolean;
  reason?: string;
}
