export enum fontWeight {
  light = 300,
  regular = 400,
  medium = 600,
  bold = 700,
}

export const typography = {
  type: {
    primary: '"Averta", Helvetica, Arial, sans-serif',
    code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  weight: {
    light: '300',
    regular: '400',
    medium: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  size: {
    s08: 8,
    s0: 10,
    s1: 12,
    s2: 14,
    s3: 16,
    s4: 18,
    s5: 20,
    m1: 20,
    m2: 24,
    m3: 28,
    m4: 36,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90,
  },
} as const;
