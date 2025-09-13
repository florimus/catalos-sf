import { Poppins } from 'next/font/google';
import '../globals.css';
import { getLanguage } from '@/utils/commonUtils';
import { Locale } from '@/common/lib/types';
import { Metadata } from 'next';
import { ImageQualityProvider } from '@/common/context/imageQualityCotext';
import { GlobalLoaderContextProvider } from '@/common/context/LoaderContext';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'], // choose the weights you need
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = (await params) || { locale: 'en-ae' };

  return {
    title: locale || 'Website',
    description: 'Your site description here',
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = (await params) || { locale: 'en-ae' };

  const language = getLanguage(locale);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={language} dir={dir}>
      <body className={`${poppins.variable} antialiased`}>
        <GlobalLoaderContextProvider>
          <ImageQualityProvider>{children}</ImageQualityProvider>
        </GlobalLoaderContextProvider>
      </body>
    </html>
  );
}
