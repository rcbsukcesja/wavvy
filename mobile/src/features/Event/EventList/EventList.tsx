import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { getEventsQuery } from 'src/API';
import { SkeletonLoader } from 'src/components/Skeleton';
import { useCombinedStore } from 'src/store';

import { EventCard } from '../EventCard/EventCard';
import { IEvent } from '../types';

// const eventsMock: IEvent[] = [
//   {
//     id: 1,
//     title: 'Fundacja Finansowa Przyszłość',
//     tag: 'samorozwój',
//     description:
//       'Warsztaty finansowe dla młodych dorosłych: Naucz się zarządzać swoimi finansami i planować budżet, aby osiągnąć stabilność finansową.',
//     dueDate: '2023-06-20T00:00:00.000Z',
//     date: '23.06.2023',
//     hourStart: '9:00',
//     hourEnd: '18:00',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       alt: 'event',
//     },
//   },

//   {
//     id: 3,
//     title: 'Fundacja Zrównoważony Rozwój',
//     tag: 'środowisko',
//     description:
//       'Konferencja o zrównoważonym rozwoju: Spotkajmy się, aby omówić strategie i rozwiązania mające na celu ochronę środowiska i zrównoważony rozwój naszego regionu.',
//     dueDate: '2023-06-20T00:00:00.000Z',
//     date: '23.06.2023',
//     hourStart: '9:00',
//     hourEnd: '18:00',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
//       alt: 'event',
//     },
//   },
//   {
//     id: 2,
//     title: 'Stowarzyszenie Pomoc Żywnościowa',
//     tag: 'zbiórka',
//     description:
//       'Zbiórka żywności dla osób potrzebujących: Dołącz do nas w akcji gromadzenia żywności i pomóż dostarczyć posiłki potrzebującym w naszej społeczności.',
//     dueDate: '2023-06-20T00:00:00.000Z',
//     date: '24.06.2023',
//     hourStart: '9:00',
//     hourEnd: '18:00',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
//       alt: 'event',
//     },
//   },
//   {
//     id: 4,
//     title: 'Akademia Kodowania Młodzieżowego',
//     tag: 'samorozwój',
//     description:
//       'Kurs programowania dla młodzieży: Dajemy młodzieży szansę na naukę podstaw programowania i rozwijanie umiejętności cyfrowych, aby przygotować ich do przyszłych zawodowych wyzwań.',
//     dueDate: '2023-07-18T00:00:00.000Z',
//     date: '23.07.2023',
//     hourStart: '9:00',
//     hourEnd: '18:00',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1563394867331-e687a36112fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
//       alt: 'event sport',
//     },
//   },
//   {
//     id: 5,
//     title: 'Kolektyw Ekspresje Artystyczne',
//     tag: 'kultura',
//     description:
//       'Wystawa sztuki lokalnej: Zobacz prace lokalnych artystów i wspieraj naszą lokalną społeczność artystyczną podczas naszej wystawy sztuki.',
//     dueDate: '2023-08-18T00:00:00.000Z',
//     date: '24.08.2023',
//     hourStart: '9:00',
//     hourEnd: '18:00',
//     image: {
//       uri: 'https://images.unsplash.com/photo-1514195037031-83d60ed3b448?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
//       alt: 'event',
//     },
//   },
// ];

export function EventList() {
  const events = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await getEventsQuery;

      return data;
    },
  });

  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const selectedCategory = useCombinedStore(state => state.selectedCategory);

  const sortAndFilterEvents = useCallback((eventList: IEvent[], monthName: string, categoryName: string) => {
    const filteredEvents = eventList.filter(event => {
      const eventMonth = new Date(event.dueDate).toLocaleString('default', { month: 'long' });

      return eventMonth === monthName && (categoryName === 'all' || event.tag === categoryName);
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.dueDate).valueOf();
      const dateB = new Date(b.dueDate).valueOf();

      return dateA - dateB;
    });

    return sortedEvents;
  }, []);

  const sortedAndFilteredEvents = useMemo(
    () => (events.data ? sortAndFilterEvents(events.data, selectedMonth, selectedCategory) : []),
    [sortAndFilterEvents, events.data, selectedMonth, selectedCategory],
  );

  if (events.isLoading) {
    return <SkeletonLoader />;
  }

  if (events.isError) {
    return <Text>Wystąpił błąd z pobieraniem danych</Text>;
  }

  if (events.data) {
    return (
      <View style={{ flex: 1 }}>
        <FlashList
          data={sortedAndFilteredEvents}
          renderItem={({ item }) => (
            <EventCard
              id={item.id}
              title={item.title}
              description={item.description}
              tag={item.tag}
              date={item.date}
              imageAlt={item.image.alt}
              imageUri={item.image.uri}
              likesCount={item.likesCount}
            />
          )}
          estimatedItemSize={200}
          horizontal
          contentContainerStyle={{ paddingVertical: 24, paddingLeft: 12 }}
        />
      </View>
    );
  }
}
