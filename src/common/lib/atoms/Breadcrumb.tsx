import Link from 'next/link';
import { Home } from 'lucide-react';

const Breadcrumb = () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Product', href: '#' },
  ];

  return (
    <nav
      className='flex items-center text-sm text-gray-500'
      aria-label='Breadcrumb'
    >
      {items.map((item, idx) => (
        <div key={idx} className='flex items-center'>
          {idx !== 0 && <span className='mx-2 text-gray-400'>/</span>}

          {item.href !== '#' ? (
            <Link
              href={item.href}
              className='flex items-center hover:text-gray-700 transition-colors'
            >
              {idx === 0 && <Home className='w-4 h-4 mr-1' />}
              {item.label}
            </Link>
          ) : (
            <span className='text-gray-900 font-medium'>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
