import { Languages } from '@/utils/constants';

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
  language: Languages;
  channel: string;
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
  value: string | { label: string; value: string } | boolean | number;
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

export interface IVariantOption {
  href: string;
  label: string;
  thumbnail?: IMedia;
  isSelected: boolean;
}

export interface ISkuPrice {
  salesPrice: number;
  discountName: string;
  discountedPrice: number;
  discountPercentage: number;
  discountFlatPrice: number;
  taxPrice: number;
  taxValue: number;
  isFixedTax: boolean;
  finalPrice: number;
}

export interface IModule {
  id: string;
  resourceId: string;
  data: string;
  translations: Record<string, string>;
  active: boolean;
}

export interface IBreadcrumbOption {
  label: string;
  href?: string;
}

export interface AttributeInfoItem {
  label: string;
  value: string;
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';
