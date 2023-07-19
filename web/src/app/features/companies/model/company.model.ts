import { User } from 'src/app/auth/data_access/auth.state.service';
import { BusinessArea } from '../../ngo/model/ngo.model';
import { Project } from '../../projects/model/project.model';

export interface Company {
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
  businnessAreas: BusinessArea[];
  KRS: string;
  NIP: string;
  resource: string[];
  donatedProjects: Project[];
}
