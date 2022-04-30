import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

export type ModeProviderStateProps = {
  mode: "dark" | "light";
  children: React.ReactNode;
};

export type ModeProviderProps = ModeProviderStateProps;

export const ModeProvider = ({
  mode = "light",
  children,
}: ModeProviderProps) => {
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
