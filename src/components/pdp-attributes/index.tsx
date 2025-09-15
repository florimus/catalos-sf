'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AttributeInfoItem } from '@/common/lib/types';

const ProductAttributes = ({
  productInfo,
  variantInfo,
}: {
  variantInfo: AttributeInfoItem[];
  productInfo: AttributeInfoItem[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderInfo = (items: AttributeInfoItem[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-b-lg">
      {items?.map((item, i) => (
        <div
          key={i}
          className="flex justify-between border-b border-gray-200 pb-2 gap-12"
        >
          <span className="font-semibold text-gray-500">{item.label}</span>
          <span className="text-gray-600">{item.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-5 space-y-3">
      {/* Variant Info */}
      <div
        className={`border rounded-lg transition-colors ${
          openIndex === 0 ? 'border-gray-400' : 'border-gray-200'
        }`}
      >
        <button
          onClick={() => toggle(0)}
          className="w-full flex justify-between items-center py-4 px-4 text-left hover:bg-gray-100 rounded-t-lg"
        >
          <span
            className={`text-lg font-medium ${
              openIndex === 0 ? 'text-gray-500' : 'text-gray-800'
            }`}
          >
            Variant Info
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              openIndex === 0 ? 'rotate-180 text-blue-600' : 'text-gray-500'
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openIndex === 0 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {renderInfo(variantInfo)}
        </div>
      </div>

      {/* Product Info */}
      <div
        className={`border rounded-lg transition-colors ${
         openIndex === 1 ? 'border-gray-400' : 'border-gray-200'
        }`}
      >
        <button
          onClick={() => toggle(1)}
          className="w-full flex justify-between items-center py-4 px-4 text-left hover:bg-gray-100 rounded-t-lg"
        >
          <span
            className={`text-lg font-medium ${
              openIndex === 1 ? 'text-gray-500' : 'text-gray-800'
            }`}
          >
            Product Info
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              openIndex === 1 ? 'rotate-180 text-blue-600' : 'text-gray-500'
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            openIndex === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {renderInfo(productInfo)}
        </div>
      </div>
    </div>
  );
};

export default ProductAttributes;
