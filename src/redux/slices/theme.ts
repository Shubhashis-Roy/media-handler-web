import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
}

// Load saved theme (SSR-safe)
const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light"; // SSR fallback
  const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
  return saved || "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;

      // 🔥 PERSIST THEME HERE
      if (typeof window !== "undefined") {
        localStorage.setItem("theme-mode", action.payload);
      }
    },
  },
});

export const { setTheme } = slice.actions;
export default slice.reducer;
