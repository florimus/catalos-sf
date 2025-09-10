import { getProductById } from '@/actions/product';
import { IProductVariantResponse, PageContext } from '@/common/lib/types';
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

    return <PdpOverview medias={defaultVariant?.medias} />;
  },
  pageTypes.PDP
);

export default PDPPage;
