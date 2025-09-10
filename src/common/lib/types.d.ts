export type { Locale } from '@i18n/config';

export interface RawPageContext {
  params: Promise<{
    locale: Locale;
    slug?: string;
    id?: string;
    [string: string?]: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string;
  }>;
}

export interface PageContext extends RawPageContext {
  translation: Record<string, string>;
}

export interface ICategory {
  id: string;
  name: string;
  translations: Record<string, string>;
}

export interface IBrand {
  id: string;
  name: string;
  translations: Record<string, string>;
  avatar: string;
}

export interface IProductType {
  id: string;
  name: string;
  translations: Record<string, string>;
}

export interface IAttributeValue {
  type: string;
  options: null;
  value: string;
}

export interface IMedia {
  type: string;
  defaultSrc: string;
  lg: string;
  md: string;
  sm: string;
  alt: string;
}

export interface IVariant {
  id: string;
  name: string;
  slug: string;
  skuId: string;
  url: string;
  seoTitle: string;
  medias: IMedia[];
  seoDescription: string;
  attributes: Record<string, IAttributeValue>;
  translations: Record<string, string>;
}

export interface IProductVariantResponse {
  id: string;
  name: string;
  skuId: string;
  categoryName: string;
  categoryId: string;
  brandName: string;
  brandId: string;
  productTypeId: string;
  attributes: Record<string, IAttributeValue>;
  translations: Record<string, string>;
  category: Partial<ICategory>;
  brand: Partial<IBrand>;
  productType: Partial<IProductType>;
  variants: Partial<IVariant>[];
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';
