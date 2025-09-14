'use server';

import { graphqlRequest } from '@/common/lib/graphqlClient';
import { GET_MODULE_BY_ID } from '@/common/lib/queries/module';
import { IModule } from '@/common/lib/types';

export const getModuleById = async (resourceId: string) => {
  const response = await graphqlRequest<{ getModuleByResourceId: IModule }>(
    GET_MODULE_BY_ID,
    {
      id: resourceId,
    }
  );

  return response?.getModuleByResourceId as IModule;
};
