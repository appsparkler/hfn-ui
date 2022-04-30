import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Switch, FormControlLabel, Box } from '@mui/material'
import { Provider } from 'react-redux'
import { noop } from 'lodash'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen'
}

const ThemeContext = createContext({
  mode: 'light',
  setDarkTheme: noop,
  setLightTheme: noop,
  toggleTheme: noop
})

export const ThemeContextProvider = ({ mode: $mode, children }) => {
  const [mode, setMode] = useState($mode);
  const setDarkTheme = () => setMode('dark');
  const setLightTheme = () => setMode('light');
  const toggleTheme = () => setMode(mode => mode === 'dark' ? 'dark' : 'light')
  const theme = createTheme({ palette: { mode } })
  const handleSwitchMode = useCallback(({ target: { checked } }) => {
    if (checked) {
      setDarkTheme()
    } else setLightTheme()
  }, [])
  return <ThemeContext.Provider value={{ mode, setDarkTheme, setLightTheme, toggleTheme }}>
    <ThemeProvider theme={theme}>
      <Box display="flex" alignItems="end">
        {/* <FormControlLabel label="Dark Mode"> */}
        <Switch checked={mode === 'dark'} onChange={handleSwitchMode} />
        {/* </FormControlLabel> */}
      </Box>
      {children}
    </ThemeProvider>
  </ThemeContext.Provider>
}

const darkTheme = createTheme({ palette: { mode: 'dark' } })

export const decorators = [
  (Story) =>
    // <÷ThemeProvider theme={darkTheme}>
    <ThemeContextProvider mode="light">
      <CssBaseline />
      <Story />
    </ThemeContextProvider>
  // </ThemeProvider>
]
