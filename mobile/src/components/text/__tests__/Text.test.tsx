/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react-native';

import { Text } from '../Text.component';

jest.mock('@/theme/hooks/useTheme', () => ({
  useTheme: () => ({
    fontTypes: {
      primaryRegular: 'OpenSans-Regular',
      primaryBold: 'OpenSans-Bold',
    },
    fontSizes: {
      md: 16,
      xl: 24,
    },
    colors: {
      text: {
        onBackground: '#000',
        onPrimary: '#FFF',
      },
    },
    spacing: {
      letter: {
        normal: 0,
        wide: 1,
      },
    },
  }),
}));

describe('Text component', () => {
  it('should render text correctly', () => {
    const { getByText } = render(<Text>Hello world</Text>);
    expect(getByText('Hello world')).toBeDefined();
  });

  it('should render with default props', () => {
    const { getByText } = render(<Text>Default text</Text>);
    const text = getByText('Default text');

    expect(text.props.style).toStrictEqual({
      color: '#000',
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      letterSpacing: 0,
    });

    expect(text.props.style).not.toStrictEqual({
      color: '#FFF',
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      letterSpacing: 0,
    });
  });

  it('should render with custom props', () => {
    const { getByText } = render(
      <Text type="primaryBold" size="xl" color="onPrimary" letterSpacing="wide">
        Custom text
      </Text>,
    );
    const text = getByText('Custom text');

    expect(text.props.style).toStrictEqual({
      color: '#FFF',
      fontFamily: 'OpenSans-Bold',
      fontSize: 24,
      letterSpacing: 1,
    });

    expect(text.props.style).not.toStrictEqual({
      color: '#FFF',
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      letterSpacing: 1,
    });
  });
});
