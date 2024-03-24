import {SupportedLanguage} from 'types';

export const checkIfLanguageSupported =
  (language: string): language is SupportedLanguage => {
    return SupportedLanguage.includes(language as SupportedLanguage);
  };
