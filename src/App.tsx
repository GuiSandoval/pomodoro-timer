import { Button } from "./components/Button";
import { ThemeProvider } from 'styled-components'
import { Default } from './styles/themes';
export function App() {
  return (
    <ThemeProvider theme={Default}>
      <Button />
      <Button />
      <Button />
    </ThemeProvider>
  )
}
