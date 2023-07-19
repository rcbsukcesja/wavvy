import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Roboto: {
      300: {
        normal: 'Poppins-Light',
      },
      400: {
        normal: 'Poppins-Regular',
      },
      700: {
        normal: 'Poppins-Bold',
      },
    },
  },

  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});
