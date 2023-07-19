export type ReceiverType = 'ngo' | 'company' | 'other';

export interface Message {
  id: string;
  title: string;
  content: string;
  receiverId: string;
  receiverType: ReceiverType;
}

export type MessagePayload = Omit<Message, 'id'>;
