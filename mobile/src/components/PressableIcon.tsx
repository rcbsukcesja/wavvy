import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface PressableIconProps {
  name: string;
  size: number;
  color: string;
  handleOnPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
});

export function PressableIcon({ name, size, color, handleOnPress }: PressableIconProps) {
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <Entypo name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
