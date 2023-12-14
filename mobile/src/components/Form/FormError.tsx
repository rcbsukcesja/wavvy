import { View } from 'react-native';
import { Text } from 'src/components/text/Text.component';

interface FormErrorProps {
  message: string;
}

// const styles = StyleSheet.create({
//   message: {
//     color: 'red',
//   },
// });

export function FormError({ message }: FormErrorProps) {
  return (
    <View>
      <Text color="error">{message}</Text>
    </View>
  );
}
