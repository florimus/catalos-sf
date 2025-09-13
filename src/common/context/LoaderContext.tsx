'use client';

import {
  createContext,
  TransitionStartFunction,
  useContext,
  useTransition,
} from 'react';

type GlobalLoaderContextType = {
  start: TransitionStartFunction;
};

export const GlobalLoaderContext = createContext<GlobalLoaderContextType>({
  start: () => {},
});

export const useLoader = () => {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error(
      'useGlobalLoader must be used within a GlobalLoaderContextProvider'
    );
  }
  return context;
};

export const GlobalLoaderContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const loader: React.ReactNode = (
    <div className='w-full h-svh flex items-center justify-center animate-spin'>
      <div className='h-1/7 w-1/8 border-8 border-blue-400 rounded-full animate-spin' />
    </div>
  );
  return (
    <GlobalLoaderContext.Provider value={{ start: startTransition }}>
      {isPending ? loader : children}
    </GlobalLoaderContext.Provider>
  );
};
