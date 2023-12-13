/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, screen } from '@testing-library/react-native';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { COMMON_COLORS } from 'src/theme/colorsConfig';

describe('Button', () => {
  it('renders button with given title', () => {
    const { getAllByText } = render(<PrimaryButton label="Title" onPress={() => {}} />);
    expect(getAllByText('Title')).toHaveLength(1);
    expect(getAllByText('Title')).not.toHaveLength(0);
  });
  it('has proper styles when disabled', () => {
    const { getAllByText, getByLabelText } = render(<PrimaryButton label="Title" onPress={() => {}} disabled />);
    expect(getAllByText('Title')).toHaveLength(1);
    expect(getByLabelText('Title-button').props.style[1]).toMatchObject({
      backgroundColor: COMMON_COLORS.white,
    });
    expect(getByLabelText('Title-button').props.style).not.toMatchObject({
      backgroundColor: COMMON_COLORS.primary[700],
    });
  });
  it('calls onPress function when pressed', () => {
    const handlePress = jest.fn();
    render(<PrimaryButton label="Title" onPress={handlePress} />);
    fireEvent.press(screen.getByText('Title'));
    expect(handlePress).toBeCalled();
  });
});
