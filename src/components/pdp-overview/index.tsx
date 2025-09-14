import {
  IBreadcrumbOption,
  IMedia,
  IVariant,
  IVariantOption,
} from '@/common/lib/types';
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
  breadcrumbOptions,
  defaultTranslations,
  productName,
  channel,
  locale,
}: {
  medias?: IMedia[];
  productName?: string;
  variantOptions?: IVariantOption[];
  defaultVariant?: Partial<IVariant>;
  channel: string;
  locale: string;
  defaultTranslations: Record<string, string>;
  breadcrumbOptions: IBreadcrumbOption[];
}) => {
  return (
    <div className='container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <ImageGallery medias={medias} />
      <div className='flex flex-col justify-between'>
        <Breadcrumb options={breadcrumbOptions} />
        <div>
          <h3 className='text-3xl mt-8 font-bold'>{productName}</h3>
          <p className='text-lg text-gray-500 font-bold mb-8'>
            {translate(
              { name: defaultVariant?.name?.toUpperCase() || '' },
              defaultVariant?.translations || {}
            )}
          </p>
        </div>
        <div>
          <p className='text-gray-500 text-sm font-light'>
            <Link
              href='/shipping'
              className='font-bold hover:underline text-blue-500'
            >
              {defaultTranslations?.shipping_price}{' '}
            </Link>
            {defaultTranslations?.calculate_at_checkout}
          </p>
          {defaultVariant?.skuId && (
            <Suspense fallback={<SkuPriceSkeleton />}>
              <Price skuId={defaultVariant?.skuId} channel={channel}>
                {(price) => (
                  <SkuPrice
                    {...price}
                    defaultTranslations={defaultTranslations}
                  />
                )}
              </Price>
            </Suspense>
          )}
        </div>
        <hr className='text-gray-200 my-5' />
        <VariantSelection
          variantOptions={variantOptions}
          locale={locale}
          defaultTranslations={defaultTranslations}
        />
        <button className='w-full bg-blue-900 text-white py-3 mt-5 font-bold hover:bg-blue-800 rounded-lg'>
          {defaultTranslations?.add_to_cart}
        </button>
      </div>
    </div>
  );
};

export default PdpOverview;
