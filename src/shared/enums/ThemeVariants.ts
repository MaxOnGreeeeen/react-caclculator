/**
 * Варианты темы приложения
 */
export const ThemeVariants = {
  Dark: "dark",
  Light: "light",
} as const;

export type ThemeVariantsType = typeof ThemeVariants[keyof typeof ThemeVariants];
