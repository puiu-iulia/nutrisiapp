// import { config } from '@tamagui/config/v2';
import { createTamagui, createFont } from 'tamagui';
import { animations } from './animation';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';

const headingFont = createInterFont();
const bodyFont = createInterFont();

const themedFont = createFont({
  family: 'RobotoSlabSemiBold',

  size: {
    1: 12,

    2: 14,

    3: 15,

    // ...
  },

  lineHeight: {
    1: 17,

    2: 22,

    3: 25,

    // ...
  },

  weight: {
    4: '300',

    6: '600',
  },

  letterSpacing: {
    4: 0,

    8: -1,
  },
  // for native only, alternate family based on weight/style

  face: {
    // pass in weights as keys

    700: {
      normal: 'InterBold',
      italic: 'InterBold-Italic',
    },

    800: {
      normal: 'InterBold',
      italic: 'InterBold-Italic',
    },

    900: {
      normal: 'InterBold',
      italic: 'InterBold-Italic',
    },
  },
});

const nutrisiTheme = {
  color: '#4f6c4e',
  backgroundColor: '#f1eae4',
};

const tamaguiConfig = createTamagui({
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: true,
  animations,
  shorthands,
  tokens: {
    ...tokens,
    color: {
      ...tokens.color,
      nutrisi: '#4f6c4e',
      nutrisiLight: '#f0f4f0',
    },
  },
  themes: { ...themes, nutrisi: nutrisiTheme },
  fonts: {
    heading: headingFont,
    body: bodyFont,
    nutrisi: themedFont,
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
