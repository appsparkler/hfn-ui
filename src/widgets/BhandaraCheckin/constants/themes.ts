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
      background: {
        ...theme.palette.background,
        default: mode === "dark" ? "#222222" : "#efefef",
      },
      error: {
        ...theme.palette.success,
      },
    },
  };
}
