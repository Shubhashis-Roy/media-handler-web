"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "../components/ui/theme-provider";
import { store } from "../redux/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
