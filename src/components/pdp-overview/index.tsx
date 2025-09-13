import { IMedia, IVariant, IVariantOption } from '@/common/lib/types';
import ImageGallery from './image-gallery';
import Breadcrumb from '@/common/lib/atoms/Breadcrumb';
import VariantSelection from './variantSelection';
import translate from '@/utils/translationUtils';
import Link from 'next/link';
import Price from '@/common/lib/atoms/Price';
import { Suspense } from 'react';
import SkuPrice, { SkuPriceSkeleton } from './SkuPrice';

const PdpOverview = ({
  medias,
  variantOptions,
  defaultVariant,
  productName,
  channel,
}: {
  medias?: IMedia[];
  productName?: string;
  variantOptions?: IVariantOption[];
  defaultVariant?: Partial<IVariant>;
  channel: string;
}) => {
  return (
    <div className='container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <ImageGallery medias={medias} />
      <div>
        <Breadcrumb />
        <h3 className='text-3xl mt-8 font-bold'>{productName}</h3>
        <p className='text-lg text-gray-500 font-bold mb-8'>
          {translate(
            { name: defaultVariant?.name?.toUpperCase() || '' },
            defaultVariant?.translations || {}
          )}
        </p>
        <p className='text-gray-500 text-sm font-light'>
          <Link
            href='/shipping'
            className='font-bold hover:underline text-blue-500'
          >
            Shipping price{' '}
          </Link>
          calculated at checkout
        </p>
        {defaultVariant?.skuId && (
          <Suspense fallback={<SkuPriceSkeleton />}>
            <Price skuId={defaultVariant?.skuId} channel={channel}>
              {(price) => <SkuPrice {...price} />}
            </Price>
          </Suspense>
        )}
        <hr className='text-gray-200 my-5' />
        <VariantSelection variantOptions={variantOptions} />
      </div>
    </div>
  );
};

export default PdpOverview;
