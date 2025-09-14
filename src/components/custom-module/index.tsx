import { getModuleById } from '@/actions/module';
import ModuleView from './moduleView';
import { IModule } from '@/common/lib/types';

interface CustomModuleProps {
  language: string;
  resourceId: string;
}

const CustomModule = async ({ language, resourceId }: CustomModuleProps) => {
  const moduleResponse: IModule = await getModuleById(resourceId);

  if (!moduleResponse) {
    return null;
  }

  const { data, translations } = moduleResponse;

  return (
    <ModuleView
      data={data}
      translations={JSON.parse(translations?.[language])}
      language={language}
    />
  );
};

export default CustomModule;
