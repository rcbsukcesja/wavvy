import { useState } from 'react';

import { ButtonVariant } from './types';
import { useButtonColor } from './useButtonColor';

export const useButton = (variant: ButtonVariant, disabled: boolean) => {
  const [pressed, setIsPressed] = useState(false);
  const { backgroundColor, textColor } = useButtonColor(variant, pressed, disabled);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return { pressed, handlePressIn, handlePressOut, backgroundColor, textColor };
};
