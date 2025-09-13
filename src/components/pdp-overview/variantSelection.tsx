'use client';

import { useLoader } from '@/common/context/LoaderContext';
import Image from '@/common/lib/atoms/Image';
import { IVariantOption } from '@/common/lib/types';
import { useRouter } from 'next/navigation';

const VariantSelection = ({
  variantOptions,
}: {
  variantOptions?: IVariantOption[];
}) => {
  const router = useRouter();
  const { start } = useLoader();

  const handleVariantClick = (href: string) => {
    start(() => router.push(href));
  };

  if (Array.isArray(variantOptions) && variantOptions.length > 0) {
    return (
      <div>
        <p className='text-sm text-gray-500'>Available Variant(s)</p>
        <div className='mt-3 flex gap-3 overflow-x-auto'>
          {variantOptions.map((each) => (
            <div
              key={each?.label}
              className={
                each?.isSelected
                  ? 'border border-blue-400 rounded-lg flex-shrink-0'
                  : ''
              }
            >
              <div
                onClick={() => handleVariantClick(each?.href || '')}
                className='relative w-24 h-24 aspect-square border border-gray-200 rounded-lg overflow-hidden bg-gray-50 cursor-pointer'
              >
                {each?.thumbnail && (
                  <Image medias={each.thumbnail} alt='placeholder' />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default VariantSelection;
