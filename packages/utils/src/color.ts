import toHex from 'colornames';

export const primaryColor = {
  100: '#ed54a4',
  200: '#ee65ad',
};

export const secondaryColor = {
  100: '#777',
  300: '#707070',
  200: '#22e6c5bd',
};

export const tertiaryColor = {
  100: '#204265',
  200: '#09ADE0',
};

export const Colors = {
  BLACK: '#10161A',
  WHITE: '#FFFFFF',
  GRAY: '#f9f9f9',
  GRAY20: '#333333',
  GRAY50: '#f5f5f5',
  DARKGRAY: '#a4a4a4',
  MERCURY: '#e6e6e6',
  GREEN: {
    100: '#D1FCF4',
    200: '#A2F9EA',
    300: '#78F5E0',
    400: '#56F0D6',
    500: '#21ECCA',
    600: '#00E0BB',
    700: '#00CBA9',
    800: '#00B092',
    900: '#008E77',
  },
  RED: {
    100: '#09ADE0',
    300: '#F9867B',
    400: '#F45D53',
    500: '#EB1000',
  },
  GREY_SHADE: {
    400: '#e8eaee',
    500: '#3E4855',
    600: '#2A3441',
    700: '#1F2936',
    800: '#16202D',
    900: '#0C1622',
  },
  GREY_TINT: {
    100: '#ffffff',
    200: '#F7F8FA',
    300: '#EFF1F4',
    400: '#E8EAEE',
    500: '#DFE1E6',
  },
  PINK: {
    100: '#FFEFF8',
    200: '#FEDFF0',
    300: '#FAAFD7',
    400: '#F47CBB',
    500: '#ED54A4',
    600: '#E53190',
    700: '#DA0C79',
    800: '#BD0064',
    900: '#93004D',
  },
  BLUE: {
    500: '#2a3441',
  },
};

export const HsTextAlign = {
  center: 'center',
};

export const getHexCode = (name: string): string | undefined => {
  const value = name && name.toLowerCase();
  return toHex(value);
};
