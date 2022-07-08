import { createTheme } from "@mui/material";
import { ModeProviderStateProps } from "components";

const lightTheme = createTheme({ palette: { mode: "dark" } });

const darkTheme = createTheme({ palette: { mode: "dark" } });
export const themes: ModeProviderStateProps["themes"] = {
  dark: {
    ...darkTheme,
    palette: {
      ...darkTheme.palette,
      error: {
        ...darkTheme.palette.success,
      },
    },
  },
  light: {
    ...lightTheme,
    palette: {
      ...lightTheme.palette,
      error: {
        ...lightTheme.palette.success,
      },
    },
  },
};
