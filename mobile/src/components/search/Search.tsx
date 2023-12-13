import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

interface SearchProps {
  onSearch: (phrase: string) => void;
  placeholder?: string;
}

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    input: {
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingVertical: theme.spacing.layout.vertical.lg,
      fontFamily: theme.fontTypes.primaryRegular,
      fontSize: theme.fontSizes.lg,
      borderRadius: theme.borderRadius.md,
      borderWidth: 2,
      borderColor: theme.colors.main.secondary,
    },
  });

  return styles;
};

export function Search({ onSearch, placeholder = 'Wyszukaj...' }: SearchProps) {
  const [inputValue, setInputValue] = useState('');
  const styles = useThemedStyles(themedStyles);

  const handleOnSearch = useCallback((phrase: string) => onSearch(phrase), []);

  useEffect(() => {
    const delay = 500;

    const timeoutId = setTimeout(() => {
      handleOnSearch(inputValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [inputValue, handleOnSearch]);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
    </View>
  );
}
