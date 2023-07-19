// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IEvent {
  id: number;
  title: string;
  tag: string;
  description: string;
  date: string;
  dueDate: string;
  hourStart: string;
  hourEnd: string;
  likesCount: number;
  image: {
    uri: string;
    alt: string;
  };
}
