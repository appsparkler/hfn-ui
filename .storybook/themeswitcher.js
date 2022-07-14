import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Switch, FormControlLabel, Box } from '@mui/material'
import { noop } from 'lodash'

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
            {children}
            <Box position="fixed" sx={{ right: 30, bottom: 30 }}>
                <FormControlLabel label="Dark Mode" control={<Switch checked={mode === 'dark'} onChange={handleSwitchMode} />}>
                </FormControlLabel>
            </Box>
        </ThemeProvider>
    </ThemeContext.Provider >
}

export const themeSwitcher = (Story) =>
    <ThemeContextProvider mode="light">
        <CssBaseline />
        <Story />
    </ThemeContextProvider>