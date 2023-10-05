export type NgoRegisterForm = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  organisation: string;
  createdAt: string;
  status: 'PENDING' | 'REJECTED' | 'ACCEPTED';
  reason?: string;
};
