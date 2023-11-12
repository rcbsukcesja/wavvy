import { ID } from 'src/app/core/types/id.type';

export type NgoRegisterForm = {
  id: ID;
  fullName: string;
  phone: string;
  email: string;
  organisation: string;
  createdAt: string;
  status: 'PENDING' | 'REJECTED' | 'ACCEPTED';
  reason?: string;
};
