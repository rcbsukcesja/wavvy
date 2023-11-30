import { ID } from 'src/app/core/types/id.type';

export interface Offer {
  id: ID;
  name: string;
  description: string;
  budget: number;
  fundingLevel: number;
  targetAudience: string;
  startDate: string;
  endDate: string;
  link: string;
  closeDeadline: boolean;
  scope: string;
  categories: { id: ID; name: string }[];
  followedByUser: boolean;
}
