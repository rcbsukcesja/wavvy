// eslint-disable-next-line @typescript-eslint/naming-convention
import { Address } from 'src/shared/types';

export const EVENT_STATUSES = {
  PLANNED: 'PLANNED',
} as const;

export type EventStatus = keyof typeof EVENT_STATUSES;

export interface EventDTO {
  id: string;
  name: string;
  description: string;
  address: Address;
  imageLink: string;
  links: string[];
  startTime: string;
  endTime: string;
  budget: number;
  cooperationMessage: string;
  organizer: {
    id: string;
    name: string;
    address: Address;
    email: string;
    phone: string;
    website: string;
    socialLinks: string[];
    bankAccount: string;
  };
  status: EventStatus;
  tags: string[];
  possibleVolunteer: boolean;
  createdAt: string;
  updatedAt: string;
  likes: string[];
}
