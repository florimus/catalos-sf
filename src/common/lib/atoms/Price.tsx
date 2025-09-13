'use server';

import { getSkuPriceByChannelId } from '@/actions/price';
import { ISkuPrice } from '../types';

interface PriceProps {
  skuId: string;
  channel: string;
  children: (price: Partial<ISkuPrice>) => React.ReactNode;
}

const Price = async ({ skuId, channel, children }: PriceProps) => {
  const priceResponse: ISkuPrice = await getSkuPriceByChannelId(
    skuId,
    channel,
    1
  );

  if (null === priceResponse) {
    return null
  }

  return <>{children(priceResponse)}</>;
};

export default Price;
