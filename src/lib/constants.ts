// Extended Color Palette for UI Design (Light + Dark)
export const COLORS = {
  light: {
    // Brand
    primary: "#388087",
    primaryLight: "#4C9BA0",
    primaryDark: "#2C666A",

    secondary: "#6FB3B8",
    secondaryLight: "#8ECBD0",
    secondaryDark: "#56989D",

    accent: "#BADFE7",
    accentLight: "#D4F3FA",
    accentDark: "#98C2CC",

    muted: "#C2EDCE",
    mutedLight: "#DCF8E1",
    mutedDark: "#9CCAA8",

    background: "#F6F6F2",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F3F3",

    // Neutral / Text
    text: "#0A0A0A",
    textMuted: "#5B5B5B",
    border: "#D6D6D6",
    shadow: "rgba(0,0,0,0.08)",

    // Semantic
    success: "#4CAF50",
    warning: "#E6A100",
    danger: "#E63946",
  },

  dark: {
    // Brand (Deep & Contrasty)
    primary: "#003135",
    primaryLight: "#1C4C50",
    primaryDark: "#001A1C",

    secondary: "#024950",
    secondaryLight: "#0A6A73",
    secondaryDark: "#01343A",

    accent: "#964734",
    accentLight: "#B85A44",
    accentDark: "#783927",

    muted: "#0FA4AF",
    mutedLight: "#3EC8D3",
    mutedDark: "#0A6F76",

    background: "#0C1A1C",
    surface: "#112427",
    surfaceMuted: "#143135",

    // Neutral / Text
    text: "#E8F5F8",
    textMuted: "#9AB9BE",
    border: "#2A3A3D",
    shadow: "rgba(0,0,0,0.5)",

    // Semantic
    success: "#4CD964",
    warning: "#F5C451",
    danger: "#FF6B6B",
  },
} as const;

export type ColorScheme = keyof typeof COLORS;
export type ColorKey = keyof typeof COLORS.light;
