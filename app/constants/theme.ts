export const all_themes = ["light", "dark", "system"] as const;
export type themeType = (typeof all_themes)[number];
