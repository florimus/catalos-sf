import 'server-only';

import { Language } from '@/common/lib/types';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

const readDictionaryContent = async (language: Language) =>
  dictionaries[language]();

export const getDictionary = (locale: Language) => async (pageType: string) => {
  const localeTranslation: Record<
    string,
    Record<string, string>
  > = await readDictionaryContent(locale);
  return {
    ...((localeTranslation && localeTranslation?.[pageType]) || {}),
  };
};
