import { EventListWrapper } from 'src/features/Event/EventListWrapper/EventListWrapper';

export const EVENT_LIST_SCREEN_NAME = 'Events';

export type EventListScreenParams = undefined;

export function EventListScreen() {
  return <EventListWrapper />;
}
