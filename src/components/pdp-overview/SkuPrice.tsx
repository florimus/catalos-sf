interface SkuPriceProps {
  salesPrice?: number;
  discountedPrice?: number;
  discountFlatPrice?: number;
  defaultTranslations: Record<string, string>;
}

const SkuPrice = ({ discountFlatPrice, salesPrice, defaultTranslations }: SkuPriceProps) => {
  if (!salesPrice) {
    return <></>;
  }
  const hasDiscount = discountFlatPrice !== salesPrice;

  return (
    <div className='flex items-center'>
      <p className='text-2xl font-bold my-5'>₹ {discountFlatPrice} </p>
      {hasDiscount && (
        <p className='text-2xl font-light line-through my-5 text-gray-400 mx-3'>
          ₹ {salesPrice}
        </p>
      )}
      <span className='text-sm text-gray-500 mt-1 mx-3'>{defaultTranslations.exc_of_tax}</span>
    </div>
  );
};

export const SkuPriceSkeleton = () => {
  return (
    <div className='flex items-center animate-pulse my-5'>
      <div className='h-13 w-54 bg-gray-200 rounded'></div>
    </div>
  );
};

export default SkuPrice;
