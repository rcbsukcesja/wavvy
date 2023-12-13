// PRIMARY
const PRUSSIAN_BLUE = '#012640';
const LAPIS_LAZULI = '#025a98';
const FRENCH_BLUE = '#0479CB';
const CELESTIAL_BLUE = '#1a9efa';
const MAYA_BLUE = '#52b6fb';
const LIGHT_SKY_BLUE = '#82cafc';
const URANIAN_BLUE = '#b2defd';
const ALICE_BLUE = '#e2f3fe';

// SECONDARY
const BLACK = '#000910';
const CHARCOAL = '#424242';
const DIM_GRAY = '#616161';
const GREY = '#757575';
const NOBEL = '#9E9E9E';
const QUARTZ = '#E0E0ED';

// OTHER
const WHITE = '#FFF';
const TOPAZ = '#FCC27C';
const NEON_WHITE = '#FCFEFF';
const CARROT_ORANGE = '#E68B14';
const BILBAO = '#357102';
const THUNDERBIRD = '#C01910';
const ALTO = '#E0E0E0';
const ALTO2 = '#D8D8D8';
const ALTO3 = '#D8D6D6';

export const COMMON_COLORS = {
  primary: {
    '900': PRUSSIAN_BLUE,
    '800': LAPIS_LAZULI,
    '700': FRENCH_BLUE,
    '600': CELESTIAL_BLUE,
    '500': MAYA_BLUE,
    '200': LIGHT_SKY_BLUE,
    '100': URANIAN_BLUE,
    '50': ALICE_BLUE,
  },
  secondary: {
    '900': BLACK,
    '800': CHARCOAL,
    '700': DIM_GRAY,
    '600': GREY,
    '500': NOBEL,
    '300': QUARTZ,
  },
  error: THUNDERBIRD,
  success: BILBAO,
  warning: CARROT_ORANGE,
  white: WHITE,
  black: CHARCOAL,
  neonWhite: NEON_WHITE,
  alto: ALTO,
  alto2: ALTO2,
  alto3: ALTO3,
  accent: TOPAZ,
} as const;

export const MAIN_LIGHT_THEME_COLORS = {
  main: {
    primary: COMMON_COLORS.primary[700],
    primaryVariant: COMMON_COLORS.primary[500],
    primarySecondVariant: COMMON_COLORS.primary[900],
    secondary: COMMON_COLORS.secondary[300],
    secondaryVariant: COMMON_COLORS.secondary[700],
    success: COMMON_COLORS.success,
    warning: COMMON_COLORS.warning,
    error: COMMON_COLORS.error,
    accent: COMMON_COLORS.accent,
    primaryLight: COMMON_COLORS.primary[50],
  },
} as const;

// TODO : prawdopodbnie kolory będą do podmiany po ustaleniu z pocztą
export const MAIN_DARK_THEME_COLORS = {
  main: {
    primary: COMMON_COLORS.primary[500],
    primaryVariant: COMMON_COLORS.primary[700],
    primarySecondVariant: COMMON_COLORS.primary[600],
    secondary: COMMON_COLORS.secondary[700],
    secondaryVariant: COMMON_COLORS.secondary[300],
    success: COMMON_COLORS.success,
    warning: COMMON_COLORS.warning,
    error: COMMON_COLORS.error,
    accent: COMMON_COLORS.accent,
    primaryLight: COMMON_COLORS.primary[50],
  },
} as const;

export const SURFACE_LIGHT_THEME_COLORS = {
  surface: {
    background: COMMON_COLORS.neonWhite,
    surface: COMMON_COLORS.white,
    border: COMMON_COLORS.alto3,
  },
} as const;

// TODO : prawdopodbnie kolory będą do podmiany po ustaleniu z pocztą
export const SURFACE_DARK_THEME_COLORS = {
  surface: {
    background: COMMON_COLORS.black,
    surface: COMMON_COLORS.secondary[900],
    border: COMMON_COLORS.primary[100],
  },
} as const;

export const TEXT_LIGHT_THEME_COLORS = {
  text: {
    onPrimary: COMMON_COLORS.white,
    onSecondary: COMMON_COLORS.secondary[800],
    onSecondaryVariant: COMMON_COLORS.white,
    onBackground: COMMON_COLORS.secondary[800],
    onBackgroundVariant: COMMON_COLORS.secondary[600],
    onSurface: COMMON_COLORS.secondary[800],
    onSurfaceVariant: COMMON_COLORS.secondary[300],
    onError: COMMON_COLORS.white,
    onSuccess: COMMON_COLORS.secondary[800],
    onWarning: COMMON_COLORS.secondary[800],
    success: COMMON_COLORS.success,
    error: COMMON_COLORS.error,
    warning: COMMON_COLORS.warning,
    onDisabledButton: COMMON_COLORS.alto2,
    onHoverPrimary: COMMON_COLORS.primary[700],
  },
} as const;

// TODO : prawdopodbnie kolory będą do podmiany po ustaleniu z pocztą
export const TEXT_DARK_THEME_COLORS = {
  text: {
    onPrimary: COMMON_COLORS.white,
    onPrimaryVariant: COMMON_COLORS.white,
    onSecondary: COMMON_COLORS.white,
    onSecondaryVariant: COMMON_COLORS.secondary[800],
    onBackground: COMMON_COLORS.white,
    onBackgroundVariant: COMMON_COLORS.neonWhite,
    onSurface: COMMON_COLORS.white,
    onSurfaceVariant: COMMON_COLORS.secondary[500],
    onError: COMMON_COLORS.white,
    onSuccess: COMMON_COLORS.secondary[800],
    onWarning: COMMON_COLORS.secondary[800],
    success: COMMON_COLORS.success,
    error: COMMON_COLORS.error,
    warning: COMMON_COLORS.warning,
    onDisabledButton: COMMON_COLORS.alto2,
    onHoverPrimary: COMMON_COLORS.primary[700],
  },
} as const;

export const STATE_LIGHT_THEME_COLORS = {
  state: {
    main: {
      primary: COMMON_COLORS.primary[800],
      primaryVariant: COMMON_COLORS.primary[600],
      secondary: COMMON_COLORS.secondary[700],
      secondaryVariant: COMMON_COLORS.secondary[300],
      disabled: COMMON_COLORS.white,
    },
    surface: {
      surface: COMMON_COLORS.secondary[300],
      surfaceVariant: COMMON_COLORS.primary[50],
    },
    text: {
      onPrimary: COMMON_COLORS.white,
      onPrimaryVariant: COMMON_COLORS.white,
      onSecondary: COMMON_COLORS.white,
      onSecondaryVariant: COMMON_COLORS.primary[800],
      onBackground: COMMON_COLORS.primary[600],
      onSurface: COMMON_COLORS.secondary[800],
      onSurfaceVariant: COMMON_COLORS.primary[900],
      onDisabled: COMMON_COLORS.white,
      onDisabledVariant: COMMON_COLORS.secondary[600],
    },
  },
} as const;

// TODO : prawdopodbnie kolory będą do podmiany po ustaleniu z pocztą
export const STATE_DARK_THEME_COLORS = {
  state: {
    main: {
      primary: COMMON_COLORS.primary[900],
      primaryVariant: COMMON_COLORS.primary[600],
      secondary: COMMON_COLORS.secondary[300],
      secondaryVariant: COMMON_COLORS.secondary[700],
      disabled: COMMON_COLORS.secondary[600],
    },
    surface: { surface: COMMON_COLORS.secondary[700], surfaceVariant: COMMON_COLORS.primary[100] },
    text: {
      onPrimary: COMMON_COLORS.white,
      onPrimaryVariant: COMMON_COLORS.white,
      onSecondary: COMMON_COLORS.secondary[800],
      onSecondaryVariant: COMMON_COLORS.white,
      onBackground: COMMON_COLORS.primary[600],
      onSurface: COMMON_COLORS.primary[600],
      onSurfaceVariant: COMMON_COLORS.primary[500],
      onDisabled: COMMON_COLORS.white,
      onDisabledVariant: COMMON_COLORS.secondary[600],
    },
  },
};
