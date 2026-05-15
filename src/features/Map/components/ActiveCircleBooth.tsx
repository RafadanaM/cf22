import { Pane } from 'react-leaflet/Pane';
import { SVGOverlay } from 'react-leaflet/SVGOverlay';

import { useActiveCircle } from '@/features/Circle/contexts/ActiveCircleProvider';
import { useCircleFilter } from '@/features/Circle/contexts/CircleFilterProvider';
import { useCircle } from '@/features/Circle/contexts/CircleProvider';

import { bounds, MAP_HEIGHT, MAP_WIDTH } from '../constants/map';
import BoothRectangle from './BoothRectangle';
import CircleCodeText from './CircleCodeText';

function ActiveCircleBooth() {
  const { activeCircleId } = useActiveCircle();
  const { getCircleDetail } = useCircle();
  const { attendingDay } = useCircleFilter();

  const circle = getCircleDetail(activeCircleId);

  const isInAttendingDay = circle?.attendingDays.includes(attendingDay);

  if (!circle || !isInAttendingDay) return null;

  return (
    <Pane
      name="highlight-pane"
      key={attendingDay}
      style={{ zIndex: 500, pointerEvents: 'none' }}
    >
      <BoothRectangle circle={circle} isActive />
      <SVGOverlay
        bounds={bounds}
        attributes={{ viewBox: `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}` }}
      >
        <CircleCodeText circle={circle} isActive />
      </SVGOverlay>
    </Pane>
  );
}

export default ActiveCircleBooth;
