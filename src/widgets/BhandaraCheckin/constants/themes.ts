import { createTheme } from "@mui/material";
import { ModeProviderStateProps } from "components";

export const themes: ModeProviderStateProps["themes"] = {
  dark: getTheme("dark"),
  light: getTheme("light"),
};
function getTheme(mode: ModeProviderStateProps["mode"]) {
  const theme = createTheme({ palette: { mode } });
  return {
    ...theme,
    palette: {
      ...theme.palette,
      error: {
        ...theme.palette.success,
      },
    },
  };
}
