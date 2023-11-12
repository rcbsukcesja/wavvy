import { ID } from 'src/app/core/types/id.type';

export type ReceiverType = 'ngo' | 'company' | 'other';

export interface Message {
  id: ID;
  title: string;
  message: string;
  receiverId: number;
  name: string;
  contact: string; // email | phone number
  createdAt: string;
}

export type MessagePayload = Omit<Message, 'id' | 'createdAt'>;
