import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import RefineWrapper from "./RefineWrapper";
import { BrowserRouter } from "react-router-dom";
import { customTheme } from "./customTheme";

function App() {
  return (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <BrowserRouter>
          <RefineWrapper />
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
