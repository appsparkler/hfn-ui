import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

type Themes = {
  dark: Theme;
  light: Theme;
};

export type ModeProviderStateProps = {
  mode: keyof Themes;
  themes?: Themes;
};

export type ModeProviderOwnProps = {
  children: React.ReactNode;
};

export type ModeProviderProps = ModeProviderStateProps & ModeProviderOwnProps;

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

export const ModeProvider = ({
  mode = "light",
  themes = {
    dark: darkTheme,
    light: lightTheme,
  },
  children,
}: ModeProviderProps) => {
  const theme = useMemo(() => themes[mode], [mode, themes]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
