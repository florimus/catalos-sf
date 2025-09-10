import { IMedia } from '@/common/lib/types';
import ImageGallery from './image-gallery';

const PdpOverview = ({ medias }: { medias?: IMedia[] }) => {
  return (
    <div className='container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
      <ImageGallery medias={medias} />
      {/* <ImageGallery /> */}
    </div>
  );
};

export default PdpOverview;
