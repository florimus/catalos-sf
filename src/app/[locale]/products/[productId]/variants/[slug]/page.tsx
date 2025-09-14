import { getProductById } from '@/actions/product';
import {
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
  async ({ language, channel, ...rest }: PageContext) => {
    const { productId, slug } = await rest.params;
    const product: IProductVariantResponse = await getProductById(
      productId,
      language
    );

    const defaultVariant = product?.variants?.find(
      (variant) => variant.slug === slug
    );

    const variantOptions: IVariantOption[] | undefined = product?.variants?.map(
      (variant) => ({
        href: variant.url || '#',
        label: variant.name || '',
        thumbnail: variant?.medias?.[0],
        isSelected: variant?.id === defaultVariant?.id,
      })
    );

    return (
      <>
        <PdpOverview
          channel={channel}
          medias={defaultVariant?.medias}
          variantOptions={variantOptions}
          defaultVariant={defaultVariant}
          productName={translate({ name: product?.name }, product.translations)}
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
