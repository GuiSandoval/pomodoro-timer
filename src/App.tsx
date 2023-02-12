import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes";

import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {
  const baseNameUrl = window.location.pathname.split("/")[1];

  return (
    <BrowserRouter basename={`/${baseNameUrl}`}>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}
