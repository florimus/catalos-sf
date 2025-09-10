import { getProductById } from '@/actions/product';
import {
  IProductVariantResponse,
  IVariantOption,
  PageContext,
} from '@/common/lib/types';
import PdpOverview from '@/components/pdp-overview';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';
import translate from '@/utils/translationUtils';

const PDPPage = handleServerProps(
  async ({ translation, language, ...rest }: PageContext) => {
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
      <PdpOverview
        medias={defaultVariant?.medias}
        variantOptions={variantOptions}
        defaultVariant={defaultVariant}
        productName={translate({ name: product?.name }, product.translations)}
      />
    );
  },
  pageTypes.PDP
);

export default PDPPage;
