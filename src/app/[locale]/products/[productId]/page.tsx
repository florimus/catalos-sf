import { getProductById } from '@/actions/product';
import {
  IBreadcrumbOption,
  IProductVariantResponse,
  IVariantOption,
  PageContext,
} from '@/common/lib/types';
const CustomModule = React.lazy(() => import('@/components/custom-module'));
import PdpOverview from '@/components/pdp-overview';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';
import translate from '@/utils/translationUtils';
import React, { Suspense } from 'react';

const PDPPage = handleServerProps(
  async ({ language, channel, translation, ...rest }: PageContext) => {
    const { productId, slug, locale } = await rest.params;
    const product: IProductVariantResponse = await getProductById(
      productId,
      language
    );

    const defaultVariant =
      product?.variants?.find((variant) => variant.slug === slug) ||
      product?.variants?.[0];

    const variantOptions: IVariantOption[] | undefined = product?.variants?.map(
      (variant) => ({
        href: variant.url || '#',
        label: variant.name || '',
        thumbnail: variant?.medias?.[0],
        isSelected: variant?.id === defaultVariant?.id,
      })
    );

    const breadcrumbOptions: IBreadcrumbOption[] = [
      {
        label: translation.home,
        href: '/',
      },
      {
        label: translate(
          { name: product?.category?.name || '' },
          product?.category?.translations || {}
        ),
        href: `/category/${product?.category?.id}`,
      },
      {
        label: translate(
          { name: product?.name || '' },
          product?.translations || {}
        ),
      },
    ];

    return (
      <>
        <PdpOverview
          channel={channel}
          medias={defaultVariant?.medias}
          variantOptions={variantOptions}
          defaultVariant={defaultVariant}
          breadcrumbOptions={breadcrumbOptions}
          locale={locale}
          productName={translate({ name: product?.name }, product.translations)}
          defaultTranslations={translation}
        />
        <Suspense>
          {defaultVariant?.id && (
            <CustomModule language={language} resourceId={defaultVariant.id} />
          )}
        </Suspense>
      </>
    );
  },
  pageTypes.PDP
);

export default PDPPage;
