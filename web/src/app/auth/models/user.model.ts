export type UserType = 'TODO';

export interface UserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
}
