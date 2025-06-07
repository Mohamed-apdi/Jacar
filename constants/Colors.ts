/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0ea5e9';
const tintColorDark = '#fff';

export const Theme = {
  light: {
    text: '#494949',
    textlight: '#7c7c7c',
    textdark: '#1d1d1d',
    primary: '#0ea5e9',
    primaryDark: '#0ea5ef',
    gray: '#e3e3e3',
    dark: '#3e3e3e',
    darklight: '#e1e1e1',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  fonts:{
    medium: "500",
    semibold: '600',
    light: '300',
    bold: '700',
    extraBold: '800'
  },
  radius: {
    xs:10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
  },
};
