import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "@/themes";
import { UiProvider } from "@/context/ui/UIProvider";
import { EntriesProvider } from "../context/entries/EntriesProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UiProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </EntriesProvider>
  );
}
