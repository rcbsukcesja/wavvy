import { StyleSheet, View } from 'react-native';
import { Loader } from 'src/components/animated/loader/Loader';
import { BaseButton } from 'src/components/button/BaseButton.component';
import { useButton } from 'src/components/button/useButton';
import { Text } from 'src/components/text/Text.component';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { FontSizes } from 'src/theme/types';

interface SecondaryButtonContentProps {
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
      justifyContent: 'space-evenly',
      width: '75%',
    },
  });

  return styles;
};

export function DangerButton({
  onPress,
  label,
  disabled = false,
  fontSize = 'md',
  icon,
  isLoading,
}: SecondaryButtonContentProps) {
  const { pressed, handlePressIn, handlePressOut, textColor, backgroundColor } = useButton('secondary', disabled);
  const { colors } = useTheme();
  const styles = useThemedStyles(themedStyles);

  return (
    <BaseButton
      variant="secondary"
      backgroundColor={backgroundColor}
      handleOnPress={onPress}
      handleOnPressIn={handlePressIn}
      handleOnPressOut={handlePressOut}
      disabled={disabled}
      label={label}
      extraStyle={[pressed && { shadowColor: 'transparent' }, { borderColor: colors.main.error }]}>
      <View style={styles.content}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {icon || null}
            <Text color="error" type="primaryBold" size={fontSize}>
              {label}
            </Text>
          </>
        )}
      </View>
    </BaseButton>
  );
}
