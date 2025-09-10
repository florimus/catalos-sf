'use server';

import { graphqlRequest } from '@/common/lib/graphqlClient';
import { GET_PRODUCT_BY_ID } from '@/common/lib/queries/products';
import { IProductVariantResponse } from '@/common/lib/types';

export const getProductById = async (productId: string) => {
  const response = await graphqlRequest<{ getProductById: any }>(
    GET_PRODUCT_BY_ID,
    {
      id: productId,
    }
  );

  return response?.getProductById as IProductVariantResponse;
};
