import { getProductById } from '@/actions/product';
import { PageContext } from '@/common/lib/types';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';

const PDPPage = handleServerProps(
  async ({ translation, ...rest }: PageContext) => {
    const { productId, slug } = await rest.params;
    const product = await getProductById(productId);
    return (
      <div>
        <h1>{translation.title}</h1>
        <p>{translation.description}</p>
      </div>
    );
  },
  pageTypes.PDP
);

export default PDPPage;
