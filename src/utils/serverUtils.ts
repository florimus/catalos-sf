import { RawPageContext } from '@/common/lib/types';
import { DEFAULT_LOCALE } from './constants';
import { getDictionary } from '@/i18n';
import { getLanguage } from './commonUtils';

type HandlerFunctionProps = (
  ctx: RawPageContext & {
    pageType: string;
    translation: Record<string, string>;
  }
) => Promise<unknown>;

export const handleServerProps =
  (handlerFunction: HandlerFunctionProps, pageType: string) =>
  async (ctx: RawPageContext) => {
    const { locale, ...params } = (await ctx.params) || { locale: DEFAULT_LOCALE };
    const language = getLanguage(locale);
    const translation = await getDictionary(language)(pageType);

    return await handlerFunction({
      ...ctx,
      ...params,
      pageType,
      translation,
    });
  };
