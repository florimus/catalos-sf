import { getProductById } from '@/actions/product';
import {
  AttributeInfoItem,
  IBreadcrumbOption,
  IProductVariantResponse,
  IVariantOption,
  PageContext,
} from '@/common/lib/types';
import ProductAttributes from '@/components/pdp-attributes';
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

    const productAttributes: AttributeInfoItem[] = Object.keys(
      product?.attributes
    ).map((key) => {
      const label = translate(
        { [key]: key },
        product.productType?.translations || {}
      );

      let value = null;

      const attribute = product?.attributes[key];
      if (attribute.type === 'Boolean') {
        value = attribute.value ? 'Yes' : 'No';
      } else if (attribute.type === 'Select') {
        const currentOption = attribute.value as {
          label: string;
          value: string;
        };
        value = translate(
          { [key]: currentOption?.value || '' },
          product?.translations || {}
        );
      } else {
        value = translate(
          { [key]: product?.attributes?.[key]?.value as string },
          product?.translations
        );
      }

      return {
        label,
        value,
      };
    });

    const variantAttributes: AttributeInfoItem[] = Object.keys(
      defaultVariant?.attributes || {}
    ).map((key) => {
      const label = translate(
        { [key]: key },
        product.productType?.translations || {}
      );

      let value = null;

      const attribute = defaultVariant?.attributes?.[key] || {
        type: '',
        value: '',
      };

      if (attribute.type === 'Boolean') {
        value = attribute.value ? 'Yes' : 'No';
      } else if (attribute.type === 'Select') {
        const currentOption = attribute.value as {
          label: string;
          value: string;
        };
        value = translate(
          { [key]: (currentOption?.value as string) || '' },
          defaultVariant?.translations || {}
        );
      } else {
        value = translate(
          { [key]: (defaultVariant?.attributes?.[key]?.value as string) || '' },
          defaultVariant?.translations || {}
        );
      }

      return {
        label,
        value,
      };
    });

    return (
      <>
        <PdpOverview
          channel={channel}
          medias={defaultVariant?.medias}
          variantOptions={variantOptions}
          defaultVariant={defaultVariant}
          breadcrumbOptions={breadcrumbOptions}
          locale={locale}
          defaultTranslations={translation}
          productName={translate({ name: product?.name }, product.translations)}
        />
        <ProductAttributes
          productInfo={productAttributes}
          variantInfo={variantAttributes}
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
