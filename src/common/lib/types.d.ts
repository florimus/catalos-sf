export type { Locale } from "@i18n/config";

export interface RawPageContext {
  params: {
    locale: Locale;
    id?: string;
  };
  searchParams?: {
    [key: string]: string;
  };
}

export interface PageContext extends RawPageContext {
  translation: Record<string, string>;
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';