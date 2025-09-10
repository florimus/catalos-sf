import { getProductById } from '@/actions/product';
import {
  IProductVariantResponse,
  IVariantOption,
  PageContext,
} from '@/common/lib/types';
import PdpOverview from '@/components/pdp-overview';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';

const PDPPage = handleServerProps(
  async ({ translation, ...rest }: PageContext) => {
    const { productId, slug } = await rest.params;
    const product: IProductVariantResponse = await getProductById(productId);

    const defaultVariant = product?.variants?.find(
      (variant) => variant.slug === slug
    );

    const variantOptions: IVariantOption[] | undefined = product?.variants?.map(
      (variant) => ({
        href: variant.url || '#',
        label: variant.name || '',
        thumbnail: variant?.medias?.[0] ,
        isSelected: variant?.id === defaultVariant?.id,
      })
    );

    return (
      <PdpOverview
        medias={defaultVariant?.medias}
        variantOptions={variantOptions}
      />
    );
  },
  pageTypes.PDP
);

export default PDPPage;
