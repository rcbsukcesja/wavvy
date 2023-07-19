import { Button as ButtonNb } from 'native-base';

interface ButtonProps {
  handleOnPress: () => void;
  label: string;
}

export function Button({ handleOnPress, label }: ButtonProps) {
  return <ButtonNb onPress={handleOnPress}>{label}</ButtonNb>;
}
