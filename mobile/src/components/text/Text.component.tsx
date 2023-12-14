import { Text as TextRN } from 'react-native';
import { useTheme } from 'src/theme/hooks/useTheme';
import { FontSizes, FontTypes, LetterSpacing, TextColors } from 'src/theme/types';

export interface TextProps {
  children: React.ReactNode;
  type?: keyof FontTypes;
  size?: keyof FontSizes;
  color?: keyof TextColors;
  letterSpacing?: keyof LetterSpacing;
}

export function Text({
  children,
  type = 'primaryRegular',
  size = 'md',
  color = 'onBackground',
  letterSpacing = 'normal',
}: TextProps) {
  const theme = useTheme();

  return (
    <TextRN
      style={{
        fontFamily: theme.fontTypes[type],
        fontSize: theme.fontSizes[size],
        color: theme.colors.text[color],
        letterSpacing: theme.spacing.letter[letterSpacing],
      }}>
      {children}
    </TextRN>
  );
}
