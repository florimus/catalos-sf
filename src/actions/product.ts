'use server';

import { graphqlRequest } from '@/common/lib/graphqlClient';
import { GET_PRODUCT_BY_ID } from '@/common/lib/queries/products';
import { IProductVariantResponse } from '@/common/lib/types';
import { Languages } from '@/utils/constants';

export const getProductById = async (
  productId: string,
  language?: Languages
) => {
  const response = await graphqlRequest<{ getProductById: any }>(
    GET_PRODUCT_BY_ID,
    {
      id: productId,
    },
    language
  );

  return response?.getProductById as IProductVariantResponse;
};
