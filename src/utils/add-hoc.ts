export const getEnvVariable = (variable: string): string =>
  process.env[`REACT_APP_${variable}`] as string;
