import { createTheme } from "@mui/material";
import { ModeProviderStateProps } from "components";
import { textStrings } from "./textStrings";

export const themes: ModeProviderStateProps["themes"] = {
  dark: getTheme("dark"),
  light: getTheme("light"),
};
function getTheme(mode: ModeProviderStateProps["mode"]) {
  const theme = createTheme({
    palette: { mode },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundSize: "100% 100%",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            background:
              "dark" === mode
                ? `url(${textStrings.bgImage_dark})`
                : `url(${textStrings.bgImage_light})`,
          },
        },
      },
    },
  });
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
