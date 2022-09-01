import { Button } from "./components/Button";
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes';
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button />
      <Button />
    </ThemeProvider>
  )
}
