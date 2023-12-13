import { Dimensions, StyleSheet, View } from 'react-native';

interface LoginFormContainerProps {
  children: JSX.Element | JSX.Element[];
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 24,
    paddingHorizontal: 28,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    height: Dimensions.get('window').height * 0.75,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 3,
    borderTopColor: '#FCC27C',
  },
});

export function LoginFormContainer({ children }: LoginFormContainerProps) {
  return <View style={styles.formContainer}>{children}</View>;
}
