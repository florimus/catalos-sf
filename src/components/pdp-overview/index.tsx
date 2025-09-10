import { IMedia, IVariant, IVariantOption } from '@/common/lib/types';
import ImageGallery from './image-gallery';
import Breadcrumb from '@/common/lib/atoms/Breadcrumb';
import VariantSelection from './variantSelection';
import translate from '@/utils/translationUtils';
import Link from 'next/link';

const PdpOverview = ({
  medias,
  variantOptions,
  defaultVariant,
  productName,
}: {
  medias?: IMedia[];
  productName?: string;
  variantOptions?: IVariantOption[];
  defaultVariant?: Partial<IVariant>;
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
        <div className='flex items-center'>
          <p className='text-2xl font-bold my-5'>₹ 11,999 </p>
          <p className='text-2xl font-light line-through my-5 text-gray-400 mx-5'>
            ₹ 11,999
          </p>
          <p className='font-light text-lg'>(20% Off) </p>
        </div>
        <hr className='text-gray-200 my-5' />
        <VariantSelection variantOptions={variantOptions} />
      </div>
    </div>
  );
};

export default PdpOverview;
