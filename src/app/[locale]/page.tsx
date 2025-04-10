import { PageContext } from '@/common/lib/types';
import { pageTypes } from '@/utils/constants';
import { handleServerProps } from '@/utils/serverUtils';

const HomePage = handleServerProps(async ({ translation }: PageContext) => {
  return (
    <div>
      <h1>{translation.title}</h1>
      <p>{translation.description}</p>
    </div>
  );
}, pageTypes.HOME);

export default HomePage;
