import { StyleSheet, View } from 'react-native';
import { Loader } from 'src/components/animated/loader/Loader';
import { BaseButton } from 'src/components/button/BaseButton.component';
import { useButton } from 'src/components/button/useButton';
import { Text } from 'src/components/text/Text.component';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { FontSizes } from 'src/theme/types';

interface PrimaryButtonContentProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  fontSize?: keyof FontSizes;
  icon?: JSX.Element;
  isLoading?: boolean;
}

const themedStyles = () => {
  const styles = StyleSheet.create({
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '75%',
    },
  });

  return styles;
};

export function PrimaryButton({
  onPress,
  label,
  disabled = false,
  fontSize = 'md',
  icon,
  isLoading,
}: PrimaryButtonContentProps) {
  const { pressed, handlePressIn, handlePressOut, textColor, backgroundColor } = useButton('primary', disabled);
  const styles = useThemedStyles(themedStyles);

  return (
    <BaseButton
      variant="primary"
      backgroundColor={backgroundColor}
      handleOnPress={onPress}
      handleOnPressIn={handlePressIn}
      handleOnPressOut={handlePressOut}
      disabled={disabled}
      label={label}
      extraStyle={pressed && { shadowColor: 'transparent' }}>
      <View style={styles.content}>
        {icon || null}

        {isLoading ? (
          <Loader />
        ) : (
          <Text color={textColor} type="primaryBold" size={fontSize}>
            {label}
          </Text>
        )}
      </View>
    </BaseButton>
  );
}
