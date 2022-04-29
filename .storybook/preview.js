import { ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
// import { store } from '../src/store'

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

const darkTheme = createTheme({ palette: { mode: 'dark' } })

export const decorators = [
  (Story) => <ThemeProvider theme={darkTheme}>
    <Story />
  </ThemeProvider>
  // (Story) => <Provider store={store}><Story /></Provider>
]
