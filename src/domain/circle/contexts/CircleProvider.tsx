import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo
} from 'react';

import getCircleAPI from '../api/getCircleAPI';
import { Circle, CircleId } from '../types';

interface CircleContextValue {
  circles: Circle[];
  dayOneCircles: Circle[];
  dayTwoCircles: Circle[];
  getCircleDetail: (circleId: CircleId) => Circle | undefined;
}

const CircleContext = createContext<CircleContextValue>({
  circles: [],
  dayOneCircles: [],
  dayTwoCircles: [],
  getCircleDetail: (_circleId: CircleId) => {
    // noop
  }
});

function CircleProvider({ children }: PropsWithChildren<{}>) {
  const queryFn = useCallback(async () => {
    const res = await getCircleAPI();

    if (!res.ok) {
      throw new Error('failed to fetch circle data');
    }

    return res.data;
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ['circles'],
    queryFn
  });

  const { circleLookUp, dayOneCircles, dayTwoCircles } = useMemo(() => {
    if (!data?.circles)
      return {
        circleLookUp: new Map<CircleId, Circle>(),
        dayOneCircles: [] as Circle[],
        dayTwoCircles: [] as Circle[]
      };

    const map = new Map<CircleId, Circle>();
    const dayOneCircleList: Circle[] = [];
    const dayTwoCircleList: Circle[] = [];

    data.circles.forEach((circle) => {
      map.set(circle.id, circle);

      if (circle.attendingDays.includes('SAT')) {
        dayOneCircleList.push(circle);
      }

      if (circle.attendingDays.includes('SUN')) {
        dayTwoCircleList.push(circle);
      }
    });

    return {
      circleLookUp: map,
      dayOneCircles: dayOneCircleList,
      dayTwoCircles: dayTwoCircleList
    };
  }, [data?.circles]);

  const getCircleDetail = useCallback(
    (circleId: CircleId) => {
      return circleLookUp.get(circleId);
    },
    [circleLookUp]
  );
  const memoedValue = useMemo(
    () => ({
      circles: data?.circles ?? [],
      dayOneCircles,
      dayTwoCircles,
      getCircleDetail,
      isFetching
    }),
    [getCircleDetail, data?.circles, isFetching, dayTwoCircles, dayOneCircles]
  );

  return <CircleContext.Provider value={memoedValue}>{children}</CircleContext.Provider>;
}

export default CircleProvider;

export function useCircle() {
  const circleCtx = useContext(CircleContext);

  if (!circleCtx) {
    throw new Error('useCircle must be used with CircleProvider!');
  }

  return circleCtx;
}
