import React from "react";
import { Button } from "./components/Button";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button />
      <Button />
      <GlobalStyles />
    </ThemeProvider>
  );
}
