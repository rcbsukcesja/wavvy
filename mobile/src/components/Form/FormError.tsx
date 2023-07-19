import React from 'react';
import { Text, View } from 'react-native';

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
