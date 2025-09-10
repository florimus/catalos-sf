import { Languages } from './constants';

const getLanguageFromLocale = (locale: string) => {
  const languagePart = locale?.split('-')[0].toLowerCase() || 'en';
  if (languagePart === 'ar') {
    return Languages.AR;
  }
  return Languages.EN;
};

export default getLanguageFromLocale;
