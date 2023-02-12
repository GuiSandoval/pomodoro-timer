import React from "react";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";

import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes";

import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {
  // using this to deploy.
  // const baseNameUrl = window.location.pathname.split("/")[1];

  return (
    // <BrowserRouter basename={`/${baseNameUrl}`}>
    // Using HashRouter to GitHub Pages.
    <HashRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyles />
      </ThemeProvider>
    </HashRouter>
  );
}
