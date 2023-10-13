import { ID } from 'src/app/core/types/id.type';

export type ReceiverType = 'ngo' | 'company' | 'other';

export interface Message {
  id: ID;
  title: string;
  content: string;
  receiverId: ID;
  receiverType: ReceiverType;
}

export type MessagePayload = Omit<Message, 'id'>;
