export interface Offer {
  id: string;
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
  categories: { id: number; name: string }[];
}
