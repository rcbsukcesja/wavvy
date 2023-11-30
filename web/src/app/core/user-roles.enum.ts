export const USER_ROLES = {
  ADMIN: 'city_hall',
  MANAGER: 'MANAGER',
  NGO_USER: 'ngo',
  COMPANY_USER: 'company',
} as const;

export type UserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface WithUserRoles {
  roles: UserRoles[];
}
