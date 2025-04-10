import { Locale, Language } from '@/common/lib/types';

export const getLanguage: (locale: Locale)=> Language = (locale = 'en-ae') => {
  return locale.toLowerCase().split(new RegExp("-|_", "g"))[0] as Language;
}