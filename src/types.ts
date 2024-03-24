export const SupportedLanguage = ['en', 'ru', 'jpn'] as const;
export type SupportedLanguage = typeof SupportedLanguage[number];

export interface Subtitle {
  src: string,
  srclang: SupportedLanguage,
  label: string,
  default?: boolean,
}
