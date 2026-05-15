import { Activity, memo, useDeferredValue } from 'react';

import { useCircleFilter } from '@/features/Circle/contexts/CircleFilterProvider';
import { useCircle } from '@/features/Circle/contexts/CircleProvider';

import CircleBoothLabels from './CircleBoothLabels';
import CircleBooths from './CircleBooths';

function CircleMap() {
  const { attendingDay } = useCircleFilter();

  return (
    <>
      <Activity mode={attendingDay === 'SAT' ? 'visible' : 'hidden'}>
        <DayOneCircleBooths />
        <DayOneCircleBoothLabels />
      </Activity>

      <Activity mode={attendingDay === 'SUN' ? 'visible' : 'hidden'}>
        <DayTwoCircleBooths />
        <DayTwoCircleBoothLabels />
      </Activity>
    </>
  );
}

export default memo(CircleMap);

const DayOneCircleBooths = memo(() => {
  const { dayOneCircles } = useCircle();

  const deferredCircles = useDeferredValue(dayOneCircles);

  return <CircleBooths circles={deferredCircles} />;
});

const DayTwoCircleBooths = memo(() => {
  const { dayTwoCircles } = useCircle();

  const deferredCircles = useDeferredValue(dayTwoCircles);

  return <CircleBooths circles={deferredCircles} />;
});

const DayOneCircleBoothLabels = memo(() => {
  const { dayOneCircles } = useCircle();

  const deferredCircles = useDeferredValue(dayOneCircles);

  return <CircleBoothLabels circles={deferredCircles} />;
});

const DayTwoCircleBoothLabels = memo(() => {
  const { dayTwoCircles } = useCircle();

  const deferredCircles = useDeferredValue(dayTwoCircles);

  return <CircleBoothLabels circles={deferredCircles} />;
});
