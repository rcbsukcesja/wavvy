export interface Address {
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Business {
  id: string;
  name: string;
  owner: Owner;
  address: Address;
  phone: string;
  email: string;
  website: string;
  socialLinks: string[];
  //   creationDate: string;
  description: string;
  logoUrl: string;
  resources: string[];
  tags: string[];
  bankAccount: string;
}

type Owner = Omit<AppUser, 'email' | 'userType'>;

export interface AppUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: AppUserType;
}

type AppUserType = 'NGO' | 'BUSINESS' | 'MAGISTRATE' | 'RESIDENT';
