import { useState } from 'react';
import { useLikeEvent } from 'src/API';
import { useCombinedStore } from 'src/store';

export function useLike(eventLikes: string[]) {
  const userId = useCombinedStore(state => state.userId);
  const [isLiked, setIsLiked] = useState<boolean>(() => !!eventLikes?.find(id => id === userId));
  const [lastPress, setLastPress] = useState(0);
  const { mutate } = useLikeEvent();

  const handleLikeEvent = (eventId: string, clientId: string) => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    if (delta < 300) {
      setIsLiked(prev => !prev);

      mutate({ eventId, clientId });
    }

    setLastPress(time);
  };

  return { isLiked, handleLikeEvent };
}
