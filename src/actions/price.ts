'use server';

import { graphqlRequest } from '@/common/lib/graphqlClient';
import { GET_SKU_PRICE_BY_SKU_ID_AND_CHANNEL_ID } from '@/common/lib/queries/price';
import { ISkuPrice } from '@/common/lib/types';

export const getSkuPriceByChannelId = async (
  skuId: string,
  channel: string,
  quantity: number
) => {
  const response = await graphqlRequest<{ getPriceOfSku: ISkuPrice }>(
    GET_SKU_PRICE_BY_SKU_ID_AND_CHANNEL_ID,
    {
      skuId,
      channel,
      quantity,
    }
  );

  return response?.getPriceOfSku as ISkuPrice;
};
