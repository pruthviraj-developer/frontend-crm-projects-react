export const breakpoints = {
  xs: 17.5,
  sm: 20,
  md: 30,
  lg: 40,
  xl: 64,
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | string) =>
    `@media (min-width: ${breakpoints[key]}em) { ${style} }`;
};

export const mediaQueriesMaxWidth = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | string) =>
    `@media (max-width: ${breakpoints[key]}em) { ${style} }`;
};
