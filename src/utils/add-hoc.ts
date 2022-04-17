export const getEnvVariable = (variable: string): string | undefined =>
  process.env[`REACT_APP_${variable}`];
