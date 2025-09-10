import { IMedia, IVariantOption } from '@/common/lib/types';
import ImageGallery from './image-gallery';
import Breadcrumb from '@/common/lib/atoms/Breadcrumb';
import VariantSelection from './variantSelection';

const PdpOverview = ({
  medias,
  variantOptions,
}: {
  medias?: IMedia[];
  variantOptions?: IVariantOption[];
}) => {
  return (
    <div className='container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-10'>
      <ImageGallery medias={medias} />
      <div>
        <Breadcrumb />
        <h3 className='text-3xl my-8 font-bold'>Product Name</h3>
        <p className='text-gray-500 text-sm font-light'>
          <a
            href='/shipping'
            className='font-bold hover:underline text-blue-500'
          >
            Shipping price{' '}
          </a>
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
