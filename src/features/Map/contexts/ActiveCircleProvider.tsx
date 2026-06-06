import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { CircleId } from '@/domain/circle/types';

type ActiveCircleProviderContextValue = {
  activeCircleId: CircleId;
  setActiveCircleId: (circleId: CircleId) => void;
};

const ActiveCircleContext = createContext<ActiveCircleProviderContextValue>({
  activeCircleId: '',
  setActiveCircleId: (_circleId: CircleId) => {
    // noop
  }
});

function ActiveCircleProvider({ children }: PropsWithChildren<{}>) {
  const [activeCircleId, setActiveCircleId] = useState<CircleId>('');

  const value = useMemo(
    () => ({
      activeCircleId,
      setActiveCircleId
    }),
    [activeCircleId]
  );

  return <ActiveCircleContext value={value}>{children}</ActiveCircleContext>;
}

export default ActiveCircleProvider;

export const useActiveCircle = () => {
  const ctx = useContext(ActiveCircleContext);

  if (!ctx) {
    throw new Error('useActiveCircle must be used within ActiveCircleProvider');
  }

  return ctx;
};
