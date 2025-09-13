import { RawPageContext } from '@/common/lib/types';
import { DEFAULT_LOCALE, Languages } from './constants';
import { getDictionary } from '@/i18n';
import { getLanguage } from './commonUtils';
import getLanguageFromLocale from './languageUtils';

type HandlerFunctionProps = (
  ctx: RawPageContext & {
    pageType: string;
    translation: Record<string, string>;
    language: Languages;
    channel: string;
  }
) => Promise<unknown>;

export const handleServerProps =
  (handlerFunction: HandlerFunctionProps, pageType: string) =>
  async (ctx: RawPageContext) => {
    const { locale, ...params } = (await ctx.params) || {
      locale: DEFAULT_LOCALE,
    };
    const language = getLanguage(locale);
    const translation = await getDictionary(language)(pageType);

    return await handlerFunction({
      ...ctx,
      ...params,
      channel: '68374ac320d736a89de249a0',
      language: getLanguageFromLocale(locale),
      pageType,
      translation,
    });
  };
