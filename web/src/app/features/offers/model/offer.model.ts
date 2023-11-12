import { ID } from 'src/app/core/types/id.type';

export interface Offer {
  id: ID; // todo to string
  name: string;
  description: string;
  budget: number;
  fundingLevel: number;
  targetAudience: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  link: string;
  closeDeadline: boolean;
  scope: string;
  categories: { id: ID; name: string }[];
}

// {
//   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "name": "string",
//   "description": "string",
//   "budget": 0,
//   "fundingLevel": 0,
//   "targetAudience": "string",
//   "link": "string",
//   "startDate": "2023-11-12",
//   "endDate": "2023-11-12",
//   "closeDeadline": true,
//   "status": "NOT_STARTED",
//   "createdAt": "2023-11-12T09:49:26.756Z",
//   "updatedAt": "2023-11-12T09:49:26.756Z"
// }
