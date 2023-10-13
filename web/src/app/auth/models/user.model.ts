import { ID } from 'src/app/core/types/id.type';

export type UserType = 'TODO';

export interface UserData {
  id: ID;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
}
